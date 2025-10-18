import { NextRequest, NextResponse } from 'next/server'
import ai from '@/services/gemini'

export async function POST(req: NextRequest) {
  // deberia recibir el id del prestamo y pedir los demas datos a supabase con ese id > generar respuesta de gemini > crear nuevo registro en tabla "sugerencia_ia" vinculada a prestamo
  try {
    const formData = await req.formData()
    const balance = formData.get('balance') as File | null
    const resultsStatus = formData.get('resultsStatus') as File | null
    const amount = formData.get('amount')
    const months = formData.get('months')
    if (!balance || !resultsStatus) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }
    // reemplazar por documentos reales
    // Convertir a base64
    const bufferBalance = Buffer.from(await balance.arrayBuffer())
    const base64DataBalance = bufferBalance.toString('base64')

    const bufferResultsStatus = Buffer.from(await resultsStatus.arrayBuffer())
    const base64DataResultsStatus = bufferResultsStatus.toString('base64')

    // reemplazar por datos reales del cliente
    const loansPrevious: [] | object[] = [
      {
        amount: '$1.200.000',
        date: '2023-05-10',
        quotes: 12,
        quotesPaid: 6,
        quotesAmount: '$100.000',
        quotesUnpaid: 6,
      },
      {
        amount: '$2.500.000',
        date: '2022-11-20',
        quotes: 24,
        quotesPaid: 12,
        quotesAmount: '$104.167',
        quotesUnpaid: 12,
      },
      {
        amount: '$800.000',
        date: '2021-07-01',
        quotes: 36,
        quotesPaid: 30,
        quotesAmount: '$22.222',
        quotesUnpaid: 6,
      },
      {
        amount: '$5.000.000',
        date: '2024-02-15',
        quotes: 60,
        quotesPaid: 10,
        quotesAmount: '$83.333',
        quotesUnpaid: 50,
      },
    ]
    // Enviar a Gemini

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          parts: [
            {
              text: `analiza el nivel de riesgo para acceder a un prestamo de $${amount} en ${months} meses, analiza bien las tablas para no cometer errores, que la respuesta sea en español y resumida.`,
            },
            {
              text: 'debes responder solo con esta estructura: "{ "risk_level": "alto" | "medio" | "bajo", "explanation": string(Markdown), "should_approve": string }". no uses fences de json. ',
            },
            {
              text: 'verifica que los documentos correspondan a los ultimos 5 años, si no es asi, indica un riesgo alto, no recomendable y explica el motivo.',
            },

            {
              text:
                loansPrevious.length > 0
                  ? `debes tener en cuenta, ademas de los documentos, que este cliente ya tiene prestamos activos, con estos datos: ${JSON.stringify(
                      loansPrevious
                    )}`
                  : 'este cliente no tiene prestamos activos con nosotros.',
            },
            // agregar los documentos que faltan en nuevo objeto con inlineData
            {
              inlineData: {
                mimeType: balance.type, // ej: "image/png" o "application/pdf"
                data: base64DataBalance,
              },
            },
            {
              inlineData: {
                mimeType: resultsStatus.type, // ej: "image/png" o "application/pdf"
                data: base64DataResultsStatus,
              },
            },
          ],
        },
      ],
    })
    // crear nuevo registro en "sugerencia_ia" con el id del prestamo y la respuesta de gemini
    return NextResponse.json({
      respuesta: {
        risk_level: JSON.parse(result.text as string).risk_level,
        explanation: JSON.parse(result.text as string).explanation,
        should_approve: JSON.parse(result.text as string).should_approve,
      },
    })
  } catch (err) {
    console.error('Error procesando documento:', err)
    return NextResponse.json(
      { error: 'Error procesando documento' },
      { status: 500 }
    )
  }
}
