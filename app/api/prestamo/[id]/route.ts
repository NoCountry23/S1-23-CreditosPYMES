import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { IdSchema } from "@/schema/IdSchema";
export async function GET({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "ID de prestamo es requerido" },
      { status: 400 },
    );
  }
  if (!IdSchema.safeParse(id).success) {
    return NextResponse.json(
      { error: "ID de prestamo inválido" },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await supabase
      .from("prestamos")
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
      { error: "Error al obtener los datos del prestamo" },
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

  if (!IdSchema.safeParse(id).success) {
    return NextResponse.json(
      { error: "ID de prestamo inválido" },
      { status: 400 },
    );
  }
  if (!id) {
    return NextResponse.json(
      { error: "ID de prestamo es requerido" },
      { status: 400 },
    );
  }
  const updateData = await request.json();
  try {
    const { error } = await supabase
      .from("prestamos")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      {
        message: `Datos del prestamo (ID: ${id}) actualizados correctamente.`,
        pymeId: id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al actualizar los datos del prestamo" },
      { status: 500 },
    );
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;

  if (!IdSchema.safeParse(id).success) {
    return NextResponse.json(
      { error: "ID de prestamo inválido" },
      { status: 400 },
    );
  }

  if (!id) {
    return NextResponse.json(
      { error: "ID del prestamo es requerido" },
      { status: 400 },
    );
  }
  try {
    const { error } = await supabase
      .from("prestamos")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      {
        message: `Prestamo (ID: ${id}) eliminado correctamente.`,
        prestamoId: id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al eliminar el prestamo" },
      { status: 500 },
    );
  }
}

// TODO: Retorne el presatamo tomando el id de la pyme
