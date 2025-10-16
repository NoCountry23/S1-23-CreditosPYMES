import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const requestBody = await request.json();

    console.log('Request Body:', requestBody);

    if (Object.keys(requestBody).length === 0) {
        return new Response(JSON.stringify({ error: 'El cuerpo del request está vacío' }), { status: 400 });
    }

    try {
        const { data, error } = await supabase.from('prestamos').insert(requestBody);
        console.log('Request Body:', requestBody);
        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        if (!data) {
            return new Response(JSON.stringify({ error: 'Error al insertar los datos' }), { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error al insertar los datos' }), { status: 500 });
    }
}