import { createClient } from "@/lib/supabase/server";
import {  NextResponse } from "next/server";

export async function PATCH( { params }: { params: { id: string } }) {
  try {
    
    const supabase = await createClient();
    const { id } = await params;
    if (!id) {
      throw new Error("ID de prestamo es requerido");
    }
    const {data: prestamo, error: prestamoError } = await supabase.from("prestamos").update({ status: "ACEPTADO", decision_at: new Date() }).eq("id", id).select("*, pyme (*)").single();
    if (prestamoError) {
      return NextResponse.json({ error: prestamoError.message }, { status: 500 });
    }
    const {data: {user}, error: userError}= await supabase.auth.admin.getUserById(prestamo.representante_id);
    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    const response = await fetch(
      "https://docusign-api-omega.vercel.app/signature/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user?.user_metadata,
          loan: prestamo,
          pyme: prestamo.pyme
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Error al comunicarse con el servicio de firma");
    }

    const docusignData = await response.json();

    return NextResponse.json({ message: "Prestamo aceptado", docusignData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 }); 
  }
}