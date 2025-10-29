import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } =  params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("support_documents").select("*").eq("pyme_id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener documentos" }, { status: 500 });
  }
}