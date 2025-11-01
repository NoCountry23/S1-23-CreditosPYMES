// PUT /api/prestamo/[id]/assign/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const IdSchema = z.string().uuid();

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();

  try {
    // 1. ¿Quién soy?
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    // 1.1. ¿Es operador?
    const role = user?.user_metadata?.role;
    if (role !== "operator")
      return NextResponse.json({ error: "Rol no autorizado" }, { status: 403 });

    // 2. Validar id
    const { id } = await params;
    if (!IdSchema.safeParse(id).success)
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });

    // 3. Intentar asignar solo si está libre
    const { data: updated, error: updateErr } = await supabase
      .from("prestamos")
      .update({
        operator_id: user.id,
        assigned_at: new Date().toISOString(), // fecha y hora actual
      })
      .eq("id", id)
      .ilike("status", "PENDIENTE")
      .is("operator_id", null)
      .select("*")
      .single();

    if (updateErr || !updated)
      return NextResponse.json(
        { error: "El préstamo ya fue asignado a otro operador o no existe" },
        { status: 409 },
      );

    return NextResponse.json({ prestamo: updated }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al asignar el préstamo" }, { status: 500 });
  }
}