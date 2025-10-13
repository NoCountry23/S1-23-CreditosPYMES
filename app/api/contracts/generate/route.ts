import { createClient } from "@/lib/supabase/server";
import { NextResponse, NextRequest } from "next/server";
import { PrestamoWithPyme, GenerateContractRequest } from "@/lib/types/database";

export async function POST(request: NextRequest) {
  try {
    // Validar y obtener los datos del request
    const body: GenerateContractRequest = await request.json();
    
    const { prestamo_id } = body;
    // Validar que prestamo_id existe y es un número
    if (!prestamo_id || typeof prestamo_id !== 'number') {
      return NextResponse.json(
        { error: 'prestamo_id es requerido y debe ser un número' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    //  Obtener el préstamo con la información de la pyme
    const { data: prestamo, error: errorPrestamo } = await supabase
      .from('prestamo')
      .select(`
        *,
        pyme:pyme_id (*)
      `)
      .eq('id_prestamo', prestamo_id)
      .single(); // .single() asegura que solo devuelva un registro

    //  Manejar errores de Supabase
    if (errorPrestamo) {
      console.error('Error al obtener préstamo:', errorPrestamo);
      return NextResponse.json(
        { error: 'Error al obtener el préstamo: ' + errorPrestamo.message },
        { status: 500 }
      );
    }

    // Validar que el préstamo existe
    if (!prestamo) {
      return NextResponse.json(
        { error: 'Préstamo no encontrado' },
        { status: 404 }
      );
    }

    // Validar que la pyme existe
    if (!prestamo.pyme) {
      return NextResponse.json(
        { error: 'Información de la pyme no encontrada' },
        { status: 404 }
      );
    }

    // Preparar datos para el contrato
    const contractData = {
      prestamo: prestamo as PrestamoWithPyme,
      // Aquí puedes agregar más datos que necesites para el contrato
    };

    // Generar el contrato - Llamar a la API de DocuSeal
    const docusealResponse = await fetch("https://api.docuseal.com/submissions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': process.env.DOCUSEAL_API_KEY!
      },
      body: JSON.stringify({
        template_id: process.env.DOCUSEAL_TEMPLATE_ID,
        send_email: true,
        recipients: [{
          email: prestamo.pyme.email,
          name: prestamo.pyme.company_name
        }],
        values: {
          company_name: prestamo.pyme.company_name,
          cuil_cuit: prestamo.pyme.cuil_cuit,
          monto: prestamo.monto,
          currency: prestamo.currency,
          term_months: prestamo.term_months,
        }
      })
    });

    if (!docusealResponse.ok) {
      const errorText = await docusealResponse.text();
      console.error('Error de DocuSeal:', errorText);
      return NextResponse.json(
        { error: 'Error al generar el contrato con DocuSeal' },
        { status: 500 }
      );
    }

    const docusealData = await docusealResponse.json();

    return NextResponse.json({
      success: true,
      message: 'Contrato generado exitosamente',
      contract_data: contractData,
      docuseal_response: docusealData
    });

  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}