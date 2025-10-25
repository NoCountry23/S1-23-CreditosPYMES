// API para obtener documentos de soporte de un usuario específico

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  try {
    // Extraer el user_id de params
    const userId = params.id;

    if (!userId) {
      return NextResponse.json(
        { error: "ID de usuario requerido" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Obtener todos los documentos del usuario específico
    const { data: documents, error } = await supabase
      .from("support_documents")
      .select("*")
      .eq("uploaded_by", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener documentos:", error);
      return NextResponse.json(
        { error: "Error al obtener documentos" },
        { status: 500 }
      );
    }

    // Si no hay documentos, retornar array vacío
    if (!documents || documents.length === 0) {
      return NextResponse.json(
        {
          message: "No se encontraron documentos para este usuario",
          documents: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Documentos obtenidos exitosamente",
        documents: documents,
        count: documents.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
