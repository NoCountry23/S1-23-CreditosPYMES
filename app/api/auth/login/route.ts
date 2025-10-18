import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request:NextRequest) {
    
    const {email, password} = await request.json()

    !email || !password
     ? NextResponse.json(
        {error: 'Campos requeridos'},
        {status: 400}
     )
     : null

    const supabase = await createClient()

    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })


    return error
     ? NextResponse.json(
        {error: error.message},
        {status: 400}
     )
     : NextResponse.json({
        success: true,
        user: {
            id: data.user.id,
            email: data.user.email,
            role: data.user.user_metadata?.role,
            nombre: data.user.user_metadata?.nombre,
            apellido: data.user.user_metadata?.apellido
        }
     })
}