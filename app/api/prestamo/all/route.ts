// app/api/prestamos/all/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // 1. Traemos todos los préstamos
  const { data: prestamos, error: pErr } = await supabase
    .from("prestamos")
    .select("*")
    .order("created_at", { ascending: false });

  if (pErr) {
    return NextResponse.json({ error: pErr.message }, { status: 500 });
  }

  if (!prestamos.length) {
    return NextResponse.json([], { status: 200 });
  }

  // 2. Traemos todas las cuotas de esos préstamos en una sola query
  const prestamoIds = prestamos.map((p) => p.id);
  const { data: cuotas, error: cErr } = await supabase
    .from("quotas")
    .select("*")
    .in("prestamo_id", prestamoIds)
    .order("numero_cuota", { ascending: true });

  if (cErr) {
    return NextResponse.json({ error: cErr.message }, { status: 500 });
  }

  // 3. Armamos el objeto anidado
  const prestamosWithQuotas = prestamos.map((prestamo) => ({
    ...prestamo,
    quotas: cuotas?.filter((c) => c.prestamo_id === prestamo.id) ?? [],
  }));

  return NextResponse.json(prestamosWithQuotas, { status: 200 });
}