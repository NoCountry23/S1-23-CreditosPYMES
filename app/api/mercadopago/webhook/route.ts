// app/api/mercadopago/webhook/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, data } = body;

    // Mercado Pago envía distintos tipos: payment, plan, subscription, etc.
    if (type === "payment") {
      // Obtenemos el pago completo desde MP
      const paymentId = data.id;
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN_TEST}` },
      });
      const payment = await mpRes.json();

      if (payment.status === "approved") {
        const quotaId = payment.metadata?.quota_id;
        if (quotaId) {
          const now = new Date().toISOString();
          await supabase
            .from("quotas")
            .update({
              status: "pagada",
              paid_at: now,
              paid_amount: payment.transaction_amount,
              updated_at: now,
            })
            .eq("id", quotaId);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
