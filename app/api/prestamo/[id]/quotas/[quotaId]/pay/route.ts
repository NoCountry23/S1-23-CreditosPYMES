// app/api/prestamo/[id]/quotas/[quotaId]/pay/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type PayBody = { amount: number; method?: string; reference?: string; payment_date?: string; };
const round2 = (x: number) => Math.round(x * 100) / 100;

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string; quotaId: string }> }) {

  const supabase = await createClient();
  const { id, quotaId } = await params;

  const { data: auth } = await supabase.auth.getUser();
  const registeredBy = auth?.user?.id;
  if (!registeredBy) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  let body: PayBody;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "JSON inválido" }, { status: 400 }); }
  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0) return NextResponse.json({ error: "amount debe ser > 0" }, { status: 400 });

  const { data: quota, error: qErr } = await supabase
    .from("quotas")
    .select("id, prestamo_id, amount, paid_amount, status, fecha_vencimiento")
    .eq("id", quotaId)
    .single();
  if (qErr || !quota) return NextResponse.json({ error: "Cuota no encontrada" }, { status: 404 });
  if (quota.prestamo_id !== id) return NextResponse.json({ error: "La cuota no pertenece a este préstamo" }, { status: 400 });
  if (quota.status === "paid") return NextResponse.json({ error: "La cuota ya está pagada" }, { status: 409 });

  const { data: loan, error: lErr } = await supabase
    .from("prestamos") // asegúrate del nombre real
    .select("id, pyme_id")
    .eq("id", id)
    .single();
  if (lErr || !loan) return NextResponse.json({ error: "Préstamo no encontrado" }, { status: 404 });

  const prevPaid = Number(quota.paid_amount ?? 0);
  const target = Number(quota.amount);
  const tentative = prevPaid + amount;
  const newPaid = round2(Math.min(tentative, target));
  const fullyPaid = newPaid + 0.00001 >= target;
  const newStatus = fullyPaid ? "paid" : "partial";

  const { error: phErr } = await supabase.from("payment_history").insert({
    pyme_id: loan.pyme_id,
    prestamo_id: id,
    amount,
    payment_date: body.payment_date ?? new Date().toISOString(),
    payment_method: body.method ?? "manual",
    reference: body.reference ?? null,
    registered_by: registeredBy,
  });
  if (phErr) return NextResponse.json({ error: `Error registrando pago: ${phErr.message}` }, { status: 500 });

  type QuotaPatch = {
    paid_amount: number;
    status: string;
    updated_at: string;
    paid_at?: string;
  };
  const patch: QuotaPatch = { paid_amount: newPaid, status: newStatus, updated_at: new Date().toISOString() };
  if (fullyPaid) patch.paid_at = new Date().toISOString();

  const { data: updated, error: uErr } = await supabase
    .from("quotas")
    .update(patch)
    .eq("id", quotaId)
    .select("id, status, fecha_vencimiento")
    .single();
  if (uErr) return NextResponse.json({ error: `Error actualizando cuota: ${uErr.message}` }, { status: 500 });

  const today = new Date().toISOString().slice(0, 10);
  const isOverdue = updated.status !== "paid" && today > updated.fecha_vencimiento;
  const status_effective = updated.status === "paid" ? "paid" : (isOverdue ? "overdue" : updated.status);

  return NextResponse.json({ ...updated, status_effective }, { status: 200 });
}
