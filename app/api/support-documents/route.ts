import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server"; // ajustá el path según tu proyecto

export async function GET() {
  const supabase = await createClient(); // ✅ importante el await

  const { data, error } = await supabase
    .from("support-documents")
    .select("*");

  if (error) {
    console.error("Error fetching SupportDocument:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
