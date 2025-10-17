import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const requestBody = await request.json();

    if (Object.keys(requestBody).length === 0) {
        return NextResponse.json({ error: 'El cuerpo del request está vacío' }, { status: 400 });
    }

    try {
 
        const { data, error } = await supabase.from('prestamo')
            .insert(requestBody)
            .select() 

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ error: 'No se pudo crear el prestamo' }, { status: 500 });
        }


        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error('Internal Server Error:', error);
        return NextResponse.json({ error: 'Error interno del servidor al insertar los datos' }, { status: 500 });
    }
}