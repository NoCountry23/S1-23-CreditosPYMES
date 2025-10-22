import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { PymeSchema } from '@/schema/PymeSchema';
import { z } from 'zod';

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    
    let requestBody;
    try {
        // Intenta parsear el JSON. Falla si el cuerpo no es JSON válido.
        requestBody = await request.json();
    } catch (e) {
        console.error('Internal Server Error:', e);
        return NextResponse.json({ error: 'Formato de solicitud JSON inválido.' }, { status: 400 });
    }


    const validationResult = PymeSchema.safeParse(requestBody);


    if (!validationResult.success) {
        // Devolver 400 Bad Request con detalles de todos los errores de validación
        return NextResponse.json(
            { 
                error: 'Datos de la pyme inválidos.', 
                details: z.treeifyError(validationResult.error) // Usando el método recomendado
            }, 
            { status: 400 }
        );
    }
    
    // Si la validación es exitosa, obtenemos los datos limpios y tipados
    const dataValidated = validationResult.data; 

    try {

        const { data, error } = await supabase.from('pyme')
            .insert(dataValidated) 
            .select() 
            .single(); 

        if (error) {
            console.error('Supabase Error:', error);
            // Error de base de datos (ej: clave duplicada, restricción de tabla)
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

       
        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error('Internal Server Error:', error);
        return NextResponse.json({ error: 'Error interno del servidor al insertar los datos' }, { status: 500 });
    }
}