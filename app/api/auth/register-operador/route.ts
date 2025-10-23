// app/api/auth/register-operador/route.ts
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

  const {
    data: { user: currentUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !currentUser) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const currentUserRole = currentUser.user_metadata?.role;
  if (currentUserRole !== "admin") {
    return NextResponse.json(
      { error: "Solo administradores pueden crear operadores" },
      { status: 403 },
    );
  }

  const { data: existingUser, error: checkError } = await supabase
    .from("auth.users")
    .select("email")
    .eq("email", email)
    .limit(1);

  if (existingUser && existingUser.length > 0) {
    return NextResponse.json(
      { error: "Ya existe un usuario con este email" },
      { status: 400 }
    );
  }

  if (checkError) {
    return NextResponse.json(
      { error: "Error verificando el email: " + checkError.message },
      { status: 500 }
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "operador", // ← FIJO, no se puede cambiar
        nombre: nombre,
        apellido: apellido || "",
      },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: "Operador registrado correctamente",
    user: {
      id: data.user?.id,
      email: data.user?.email,
      role: "operador", // ← Siempre será operador
      nombre: nombre,
      apellido: apellido,
    },
  });
}
