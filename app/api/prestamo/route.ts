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

// GET /api/prestamo?status=PENDIENTE → solo pendientes (de todas las pymes).
// GET /api/prestamo?pyme_id=fbf8000b-413f-4b30-be5b-2fff1f7490bf&status=PENDIENTE
// GET /api/prestamo → todos (sin filtros).

const QuerySchema = z.object({
  pyme_id: z.string().uuid().optional(),
  status: z.enum(["PENDIENTE", "APROBADO", "RECHAZADO", "CANCELADO"]).optional(),
});

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const raw = {
    pyme_id: searchParams.get("pyme_id") ?? undefined,
    status: searchParams.get("status") ?? undefined,
  };

  const parsed = QuerySchema.safeParse(raw);
  if (!parsed.success)
    return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 });

  const { pyme_id, status } = parsed.data;

  let query = supabase.from("prestamos").select("*");

  if (pyme_id) query = query.eq("pyme_id", pyme_id);
  if (status) query = query.eq("status", status);

  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 200 });
}
