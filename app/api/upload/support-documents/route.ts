import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const pyme_id = formData.get("pyme_id") as string;
    const uploaded_by = formData.get("uploaded_by") as string;
    const document_type = formData.get("document_type") as string;

    // Validar campos requeridos
    if (!file || !pyme_id || !document_type || !uploaded_by) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: file, pyme_id, document_type" },
        { status: 400 }
      );
    }

    // Validar archivo
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Tipo de archivo no permitido. Solo se aceptan PDF, JPG, PNG",
        },
        { status: 400 }
      );
    }

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 10MB" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();

    if (uploaded_by == null) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    // Si hay prestamo_id, incluir en el path, sino solo user.id
    const filePath = `${uploaded_by}/${fileName}`;

    const { data: publicUrlData  } = await supabase.storage
      .from("support-documents")
      .getPublicUrl(filePath);

    const public_url = publicUrlData.publicUrl;

    const { error: uploadError } = await supabase.storage
      .from("support-documents")
      .upload(filePath, file);

    if (uploadError) {
      return NextResponse.json(
        { error: "Error subiendo archivo: " + uploadError.message },
        { status: 500 }
      );
    }

    const { data: dbData, error: dbError } = await supabase
      .from("support_documents")
      .insert([
        {
          pyme_id,
          uploaded_by: uploaded_by,
          document_type,
          file_name: file.name,
          storage_path: public_url,
          file_size: file.size,
          file_type: file.type,
          status: "UPLOADED",
        },
      ])
      .select()
      .single();

    if (dbError) {
      // Si hay error en la DB, eliminar el archivo subido
      await supabase.storage.from("support-documents").remove([filePath]);

      return NextResponse.json(
        { error: "Error guardando en base de datos: " + dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "✅ Documento subido correctamente",
      document: dbData,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Error interno: " + error.message },
        { status: 500 }
      );
    }
  }
}