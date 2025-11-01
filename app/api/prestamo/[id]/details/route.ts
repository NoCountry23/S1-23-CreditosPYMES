import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { IdSchema } from "@/schema/IdSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "ID de préstamo es requerido" },
      { status: 400 }
    );
  }

  if (!IdSchema.safeParse(id).success) {
    return NextResponse.json(
      { error: "ID de préstamo inválido" },
      { status: 400 }
    );
  }

  try {
    // Obtener datos del préstamo
    const { data: prestamo, error: prestamoError } = await supabase
      .from("prestamos")
      .select("*")
      .eq("id", id)
      .single();

    if (prestamoError) {
      return NextResponse.json(
        { error: prestamoError.message },
        { status: 500 }
      );
    }

    if (!prestamo) {
      return NextResponse.json(
        { error: "Préstamo no encontrado" },
        { status: 404 }
      );
    }

    // Obtener cuotas del préstamo
    const { data: quotas, error: quotasError } = await supabase
      .from("quotas")
      .select("*")
      .eq("prestamo_id", id)
      .order("numero_cuota", { ascending: true });

    if (quotasError) {
      return NextResponse.json(
        { error: quotasError.message },
        { status: 500 }
      );
    }

    // Obtener información del contrato/DocuSign si existe
    const { data: contract, error: contractError } = await supabase
      .from("docusign_envelopes")
      .select("*")
      .eq("prestamo_id", id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    // No retornamos error si no existe contrato, es opcional
    const contractInfo = contractError ? null : contract;

    // Construir respuesta completa
    const response = {
      prestamo,
      quotas: quotas || [],
      contract: contractInfo
        ? contractInfo
        : null,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error al obtener detalles del préstamo:", error);
    return NextResponse.json(
      { error: "Error al obtener los detalles del préstamo" },
      { status: 500 }
    );
  }
}
