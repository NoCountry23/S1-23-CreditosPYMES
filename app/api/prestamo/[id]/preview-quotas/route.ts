import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildInstallments } from "@/lib/schedule";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: loan, error } = await supabase
    .from("prestamos")
    .select("id, monto, interes, cant_cuo")
    .eq("id", id)
    .single();

  if (error || !loan) {
    return NextResponse.json({ error: error?.message ?? "Loan not found" }, { status: 404 });
  }

  const { payment, cuotas } = buildInstallments({
    principal: Number(loan.monto),
    tna: Number(loan.interes), // 0.45
    n: Number(loan.cant_cuo),
    confirmedAt: new Date()
  });

  return NextResponse.json({ cuotaMensual: payment, cuotas }, { status: 200 });
}
