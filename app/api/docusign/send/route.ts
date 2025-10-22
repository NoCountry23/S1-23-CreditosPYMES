import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Esta función prepara los datos específicos para DocuSign
function prepareDocuSignData(prestamo: any, pyme: any) {
  return {
    signerEmail: pyme.email,
    signerName: pyme.representante_legal,
    signerNumber: pyme.telefono || "5491112345678", // Ejemplo
    signerCountryCode: pyme.codigo_pais || "54", // Argentina por defecto
    // Estos valores se usarán para rellenar el PDF
    companyData: {
      cuit: pyme.cuit || "123456789",
      amount: `$${prestamo.monto}`,
      quotes: prestamo.plazo.toString(),
      company_name: pyme.nombre,
      representative: pyme.representante_legal,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const { id_prestamo } = await request.json();

    if (!id_prestamo) {
      return NextResponse.json(
        { error: "prestamo_id es requerido" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: prestamo, error } = await supabase
      .from("prestamo")
      .select(
        `
          *,
          pymes (*)
        `
      )
      .eq("id_prestamo", id_prestamo)
      .single();

    if (error) {
      console.error("Error al buscar préstamo:", error);
      return NextResponse.json(
        { error: "Préstamo no encontrado" },
        { status: 404 }
      );
    }

    const docusignData = prepareDocuSignData(prestamo, prestamo.pyme_id)

    // LLamar al servicio de Lautaro
    const response = await fetch('https://docusign-api-omega.vercel.app/signature/send', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(docusignData)
    })


    if(!response.ok) {
        throw new Error('Error al comunicarse con el servicio de firma');
    }

    const result = await response.json();

    // DEBUGGING: Imprime toda la respuesta para ver qué te devuelve
    console.log("=== RESPUESTA COMPLETA DE DOCUSIGN ===");
    console.log("Status:", response.status);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));
    console.log("Body completo:", JSON.stringify(result, null, 2));

    // VALIDACIÓN: Verifica que la respuesta tenga la estructura esperada
    if (!result || typeof result !== 'object') {
      console.error("Respuesta inválida: no es un objeto");
      return NextResponse.json(
        { error: "Respuesta inválida del servicio de firma" },
        { status: 500 }
      );
    }

    // VALIDACIÓN: Verifica que tenga los campos esperados
    if (!result.data && !result.success && !result.envelopeId) {
      console.warn("La respuesta no tiene los campos esperados");
      console.log("Campos disponibles:", Object.keys(result));
    }

    // LOGGING: Guarda información importante para debugging
    console.log("=== INFORMACIÓN IMPORTANTE ===");
    console.log("Envelope ID:", result.envelopeId || result.data?.envelopeId || "No disponible");
    console.log("Status:", result.status || result.data?.status || "No disponible");
    console.log("Success:", result.success || result.data?.success || "No disponible");

    // RESPUESTA: Retorna la información al cliente
    return NextResponse.json({
      success: true,
      message: "Documento enviado para firma exitosamente",
      data: {
        envelopeId: result.envelopeId || result.data?.envelopeId,
        status: result.status || result.data?.status,
        originalResponse: result
      }
    });

  } catch (error) {
    // MANEJO DE ERRORES: Captura y registra todos los errores
    console.error("=== ERROR EN DOCUSIGN API ===");
    console.error("Tipo de error:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("Mensaje:", error instanceof Error ? error.message : String(error));
    console.error("Stack trace:", error instanceof Error ? error.stack : "No disponible");

    // INFORMACIÓN ADICIONAL PARA DEBUGGING
    if (error instanceof Error) {
      console.error("=== DETALLES DEL ERROR ===");
      console.error("Name:", error.name);
      console.error("Message:", error.message);
    }

    return NextResponse.json(
      { 
        error: "Error interno del servidor",
        message: "No se pudo procesar la solicitud de firma",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}