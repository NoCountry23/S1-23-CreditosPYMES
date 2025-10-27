// app/api/prestamo/by-pyme/[pymeId]/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const IdSchema = z.string().uuid();

export async function GET(
  _request: Request,
  { params }: { params: { pymeId: string } },
) {
  const supabase = await createClient();
  const { pymeId } = await params;

  if (!IdSchema.safeParse(pymeId).success)
    return NextResponse.json({ error: "pymeId inválido" }, { status: 400 });

  try {
    const { data, error } = await supabase
      .from("prestamos")
      .select("*")
      .eq("pyme_id", pymeId)
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error al obtener préstamos" },
      { status: 500 },
    );
  }
}