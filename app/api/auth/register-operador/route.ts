// app/api/auth/register-operador/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    
    const { email, password, nombre, apellido } = await request.json();

    // Validaciones básicas
    if (!email || !password || !nombre) {
        return NextResponse.json(
            { error: 'Email, password y nombre son requeridos' },
            { status: 400 }
        );
    }

    const supabase = await createClient();

    // 🔐 VERIFICAR que el usuario actual es ADMIN
    const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !currentUser) {
        return NextResponse.json(
            { error: 'No autenticado' },
            { status: 401 }
        );
    }

    const currentUserRole = currentUser.user_metadata?.role;
    if (currentUserRole !== 'admin') {
        return NextResponse.json(
            { error: 'Solo administradores pueden crear operadores' },
            { status: 403 }
        );
    }

    // 🎪 Registrar como operador
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role: 'operador',  // ← FIJO, no se puede cambiar
                nombre: nombre,
                apellido: apellido || ''
            }
        }
    });

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }

    return NextResponse.json({
        success: true,
        message: 'Operador registrado correctamente',
        user: {
            id: data.user?.id,
            email: data.user?.email,
            role: 'operador',  // ← Siempre será operador
            nombre: nombre,
            apellido: apellido
        }
    });
}