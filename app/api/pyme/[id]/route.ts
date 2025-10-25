import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { IdSchema } from "@/schema/IdSchema";

export async function GET({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "ID de pyme es requerido" },
      { status: 400 },
    );
  }

  if (!IdSchema.safeParse(id).success) {
    return NextResponse.json({ error: "ID de pyme inválido" }, { status: 400 });
  }
  try {
    const { data, error } = await supabase
      .from("pyme")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener los datos de la pyme" },
      { status: 500 },
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = await createClient();
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: "ID de pyme es requerido" },
      { status: 400 },
    );
  }

  if (!IdSchema.safeParse(id).success) {
    return NextResponse.json({ error: "ID de pyme inválido" }, { status: 400 });
  }
  const updateData = await request.json();
  try {
    const { error } = await supabase
      .from("pyme")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: `Datos de la Pyme (ID: ${id}) actualizados correctamente.`,
        pymeId: id,
        // Puedes incluir 'data' si quieres los datos actualizados, pero con un mensaje
        // updatedData: data
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al actualizar los datos de la pyme" },
      { status: 500 },
    );
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: "ID de pyme es requerido" },
      { status: 400 },
    );
  }

  try {
    const { error } = await supabase
      .from("pyme")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: `Pyme (ID: ${id}) eliminada correctamente.`,
        pymeId: id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al eliminar la pyme" },
      { status: 500 },
    );
  }
}


// TODO: retornar la pyme recibiendo la user_id