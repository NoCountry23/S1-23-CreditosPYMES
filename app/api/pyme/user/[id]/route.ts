import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const IdSchema = z.string().uuid({ message: "ID inválido: debe ser un UUID válido" });

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();
  const { id: userId } = await context.params; 

  if (!userId) {
    return NextResponse.json({ error: "El ID de usuario es requerido" }, { status: 400 });
  }

  const parsed = IdSchema.safeParse(userId);
  if (!parsed.success) {
    return NextResponse.json({ error: "El ID de usuario no es válido" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("pyme")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error en Supabase:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "No se encontró ninguna PyME asociada a este usuario." },
        { status: 404 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error general al obtener la PyME:", error);
    return NextResponse.json(
      { error: "Error al obtener los datos de la PyME" },
      { status: 500 },
    );
  }
}
