import { NextRequest, NextResponse } from "next/server";
import ai from "@/services/gemini";
import { createClient } from "@/lib/supabase/server";
async function getDocumentsBase64(documents: Array<{ storage_path: string; file_type: string, document_type: string }>) {
  const supabase = await createClient();
  const results: Array<{ base64: string; mimeType: string, document_type: string }> = [];
  for (const doc of documents) {
    const { data, error } = await supabase.storage
      .from("support-documents")
      .download(doc.storage_path);
    if (error) {
      console.error("Error descargando", doc.storage_path, error.message);
      continue;
    }
    // Convertir a base64
    const buffer = Buffer.from(await data.arrayBuffer());
    const base64 = buffer.toString("base64");
    results.push({
      base64,
      mimeType: doc.file_type, // ej: "application/pdf" o "image/png"
      document_type: doc.document_type
    });
  }
  return results;
}
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { pyme_id, prestamo_id } = await req.json();
    if (!pyme_id || !prestamo_id) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }
    const {data: documents, error: documentsError} = await supabase.from("support_documents").select("*").eq("pyme_id", pyme_id).in("document_type", ["balance", "resultsStatus"]);
    const docsBase64 = await getDocumentsBase64(documents as Array<{ storage_path: string; file_type: string; document_type: string }>);
    if (documentsError) {
      throw new Error(documentsError.message);
    }
    const {data: prestamo, error: prestamosError} = await supabase.from("prestamos").select("*").eq("id", prestamo_id  ).single();
    if (prestamosError) {
      throw new Error(prestamosError.message);
    }
    // Enviar a Gemini
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          parts: [
            {
              text: `analiza el nivel de riesgo para acceder a un prestamo de $${prestamo.monto} en ${prestamo.term_months} meses, analiza bien las tablas para no cometer errores, que la respuesta sea en español y resumida.`,
            },
            {
              text: "debes responder solo con esta estructura: \"{ \"risk_level\": \"alto\" | \"medio\" | \"bajo\", \"explanation\": string(Markdown), \"should_approve\": string }\". no uses fences de json. ",
            },
            {
              text: "verifica que los documentos correspondan a los ultimos 5 años, si no es asi, indica un riesgo alto, no recomendable y explica el motivo.",
            },
            ...docsBase64?.flatMap((document) => {
              return [
                {text: `documento: ${document.document_type}`},
                {inlineData: {
                  mimeType: document.mimeType, // ej: "image/png" o "application/pdf"
                  data: document.base64,
                },}
              ];
            })
          ]
        },
      ],
    });
    // // crear nuevo registro en "sugerencia_ia" con el id del prestamo y la respuesta de gemini
    const {data: sugerencia, error: sugerenciaError} = await supabase.from("sugerencia_ia").insert( {
      risk_level: JSON.parse(result.text as string).risk_level,
      explanation: JSON.parse(result.text as string).explanation,
      should_approve: JSON.parse(result.text as string).should_approve,
      prestamo_id
    }).select().single();
    if (sugerenciaError) {
      throw new Error(sugerenciaError.message);
    }
    return NextResponse.json({
      sugerencia
    });
  } catch (err) {
    console.error("Error procesando documento:", err);
    return NextResponse.json(
      { error: "Error procesando documento" },
      { status: 500 },
    );
  }
}
