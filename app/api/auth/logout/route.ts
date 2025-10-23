import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error en logout:", error.message);
      return NextResponse.json(
        { error: "Error al cerrar la sesión" },
        { status: 500 },
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Sesión cerrada correctamente",
    });

    response.cookies.delete("sb-vnjcmbcvkzbpsohwdbkd-auth-token");

    return response;
  } catch (error) {
    console.error("Error inesperado en logout:", error);
    NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
