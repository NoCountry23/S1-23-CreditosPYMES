import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { PrestamoSchema } from '@/schema/PrestamoSchema';
import { z } from 'zod';

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    
    // Leer el cuerpo del request. Usamos un try/catch para manejar JSON inválido
    let requestBody;
    try {
        requestBody = await request.json();
    } catch (error) {
        console.error('Internal Server Error:', error);
        // Si el body no es un JSON válido
        return NextResponse.json({ error: 'Formato de solicitud JSON inválido.' }, { status: 500 });
    }

  
    const validationResult = PrestamoSchema.safeParse(requestBody);

    if (!validationResult.success) {
        // Devolver 400 Bad Request con detalles de todos los errores de validación
        return NextResponse.json(
            { 
                error: 'Datos del préstamo inválidos.', 
                details: z.treeifyError(validationResult.error) // Usando el método recomendado
            }, 
            { status: 400 }
        );
    }
    
    // Datos limpios, tipados y verificados. ¡Solo estos datos irán a Supabase!
    const datosValidados = validationResult.data; 

    try {
        // 3. Insertar SOLO los datos validados
        const { data, error } = await supabase.from('prestamo')
            .insert(datosValidados) // 👈 Usamos datosValidados
            .select() 
            .single(); // Añadimos .single() para obtener el objeto directamente, como hicimos antes.

        if (error) {
            console.error('Supabase Error:', error);
            // Error de base de datos (ej: restricción de clave foránea)
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Si la inserción es exitosa, data ya contiene el objeto del préstamo
        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error('Internal Server Error:', error);
        return NextResponse.json({ error: 'Error interno del servidor al insertar el préstamo' }, { status: 500 });
    }
}