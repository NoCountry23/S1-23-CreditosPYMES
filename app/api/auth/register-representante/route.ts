import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password, nombre, apellido } = await request.json();

  // Validaciones básicas
  if (!email || !password || !nombre) {
    return NextResponse.json(
      { error: "Email, password y nombre son requeridos" },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "representante", // ← FIJO, no se puede cambiar
        nombre: nombre,
        apellido: apellido || "",
      },
      emailRedirectTo: "",
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: "Representante registrado correctamente",
    user: {
      id: data.user?.id,
      email: data.user?.email,
      role: "representante", // ← Siempre será representante
      nombre: nombre,
      apellido: apellido,
    },
  });
}
