// app/api/prestamo/assigned/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  // 1. ¿Quién soy?
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  // 2. ¿Es operador?
  const role = user.user_metadata?.role;
  if (role !== "operator")
    return NextResponse.json({ error: "Rol no autorizado" }, { status: 403 });

  // 3. Préstamos + pyme + docs de la pyme + sugerencia IA
  const { data, error } = await supabase
    .from("prestamos")
    .select(`
    *,
    pyme(*, support_documents(*)),
    sugerencia_ia(*)
  `)
    .eq("operator_id", user.id)
    .order("status", { ascending: true })
    .order("assigned_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ prestamos: data ?? [] }, { status: 200 });
}