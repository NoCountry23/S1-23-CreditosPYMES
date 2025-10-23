import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { PymeSchema } from "@/schema/PymeSchema";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // 1) Parsear JSON del body
  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch (e) {
    console.error("Invalid JSON body:", e);
    return NextResponse.json({ error: "Formato de solicitud JSON inválido." }, { status: 400 });
  }

  // 2) Validar con Zod
  const validationResult = PymeSchema.safeParse(requestBody);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: "Datos de la pyme inválidos.", details: z.treeifyError(validationResult.error) },
      { status: 400 },
    );
  }

  const dataValidated = validationResult.data;

  // 3) Insertar en Supabase
  try {
    const { data, error } = await supabase.from("pyme").insert(dataValidated).select().single();
    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message ?? "Error de base de datos" }, { status: 500 });
    }

    const pyme = {
      id: data?.id,
      company_name: data?.company_name,
      email: data?.email,
      address: data?.address,
    };

    return NextResponse.json(pyme, { status: 201 });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Error interno del servidor al insertar los datos" }, { status: 500 });
  }
}
