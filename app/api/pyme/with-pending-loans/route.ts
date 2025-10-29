// app/api/pyme/with-pending-loans/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  try {
    // 1. Préstamos pendientes SIN operador → traemos TODA la fila
    const { data: prestamos, error: prestamosError } = await supabase
      .from("prestamos")
      .select("*")
      .ilike("status", "PENDIENTE")
      .is("operator_id", null)
      .order("assigned_at", { ascending: true }); // ↑ más antiguo primero

    if (prestamosError) return NextResponse.json({ error: prestamosError.message }, { status: 500 });
    if (!prestamos || prestamos.length === 0) return NextResponse.json([], { status: 200 });

    const now = new Date();

    // 2. Calculamos prioridad y días **por préstamo**
    const prestamosConPrioridad = prestamos.map((pr) => {
      const days = Math.floor((now.getTime() - new Date(pr.assigned_at).getTime()) / (1000 * 60 * 60 * 24));
      let priority: "low" | "medium" | "high";
      if (days >= 3) priority = "high";
      else if (days === 2) priority = "medium";
      else priority = "low";

      return { ...pr, daysWaiting: days, priority };
    });

    // 3. Ids únicos de pymes
    const pymeIds = [...new Set(prestamosConPrioridad.map((p) => p.pyme_id))];

    // 4. Datos de esas pymes
    const { data: pymes, error: pymesError } = await supabase
      .from("pyme")
      .select("*")
      .in("id", pymeIds);

    if (pymesError) return NextResponse.json({ error: pymesError.message }, { status: 500 });

    // 5. Devolvemos pymes con sus préstamos (cada uno ya tiene priority & daysWaiting)
    const merged = pymes!.map((pyme) => ({
      ...pyme,
      prestamosPendientes: prestamosConPrioridad.filter((pr) => pr.pyme_id === pyme.id),
    }));

    return NextResponse.json(merged, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al obtener pymes con préstamos pendientes sin operador" }, { status: 500 });
  }
}