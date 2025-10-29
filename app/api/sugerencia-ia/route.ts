import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server"; 

export async function GET() {
  const supabase = await createClient(); // Todos lo documentos

  const { data, error } = await supabase
    .from("sugerencia_ia")
    .select("*");

  if (error) {
    console.error("Error fetching SupportDocument:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
