// app/api/pyme/me/route.ts  (nueva ruta, más simple)
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  // 1. Saber quién es
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  // 2. Traer su pyme
  const { data, error } = await supabase
    .from("pyme")
    .select("*")
    .eq("user_id", user.id)
    .single(); // <-- object | null

  if (error || !data)
    return NextResponse.json({ error: "Pyme no encontrada" }, { status: 404 });

  // 3. Object en vez de array
  return NextResponse.json(data); // {...}
}