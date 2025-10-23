import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { PrestamoSchema } from "@/schema/PrestamoSchema";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // 1) Parsear JSON
  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch (e) {
    console.error("Invalid JSON body:", e);
    return NextResponse.json({ error: "Formato de solicitud JSON inválido." }, { status: 400 });
  }

  // 2) Validar con Zod
  const validationResult = PrestamoSchema.safeParse(requestBody);
  if (!validationResult.success) {
    return NextResponse.json({ error: "Datos del préstamo inválidos.", details: z.treeifyError(validationResult.error) }, { status: 400 });
  }

  const datosValidados = validationResult.data;

  // 3) Insertar en Supabase
  try {
    const { data, error } = await supabase.from("prestamo").insert(datosValidados).select().single();
    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message ?? "Error de base de datos" }, { status: 500 });
    }

    const prestamo = {
      id: data?.id,
      pymeId: data?.pyme_id ?? data?.pymeId,
      monto: data?.monto,
      currency: data?.currency,
      termMonths: data?.term_months ?? data?.termMonths,
    };

    return NextResponse.json(prestamo, { status: 201 });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Error interno del servidor al insertar el préstamo" }, { status: 500 });
  }
}
