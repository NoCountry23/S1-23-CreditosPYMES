// app/api/prestamo/[id]/paymentHistory/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Tipos opcionales (strong-type)
type PaymentHistory = {
  id: string;
  pyme_id: string;
  prestamo_id: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  reference: string | null;
  registered_by: string;
  created_at: string;
  updated_at: string;
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  // 1. ¿Quién soy?
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr || !user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  // 2. Traer historial del préstamo
  const { data, error } = await supabase
    .from("payment_history")
    .select("*")
    .eq("prestamo_id", id)
    .order("payment_date", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ payments: (data as PaymentHistory[]) ?? [] }, { status: 200 });
}