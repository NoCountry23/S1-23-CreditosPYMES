// app/api/quotas/[id]/success/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request, { params }: { params: { quotaId: string } }) {
  const { quotaId } = params;
  const url = new URL(req.url);
  const payment_id = url.searchParams.get("payment_id");

  if (!payment_id) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/result?status=error`);
  }

  // Obtenemos la cuota
  const { data: quota } = await supabase.from("quotas").select("*").eq("id", quotaId).single();

  if (quota) {
    const now = new Date().toISOString();
    await supabase
      .from("quotas")
      .update({
        status: "pagada",
        paid_at: now,
        paid_amount: quota.amount,
        updated_at: now,
      })
      .eq("id", quotaId);
  }

  // Redirigimos a la página de resultado
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/result?status=success&loan=${quota?.prestamo_id}`
  );
}
