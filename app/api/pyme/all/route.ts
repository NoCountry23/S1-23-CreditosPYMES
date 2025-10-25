import { createClient } from "@/lib/supabase/server";
import {  NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  try {
    // Obtener todas las PyMEs
    const { data, error } = await supabase
      .from("pyme")
      .select("*"); 

    if (error) {
      console.error("Error en Supabase:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "No se encontraron PyMEs." },
        { status: 404 },
      );
    }

    return NextResponse.json(data, { status: 200 }); // devuelve array de PyMEs
  } catch (error) {
    console.error("Error general al obtener las PyMEs:", error);
    return NextResponse.json(
      { error: "Error al obtener las PyMEs" },
      { status: 500 },
    );
  }
}
