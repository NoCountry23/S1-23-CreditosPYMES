import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type RejectBody = {
  reason: string;          // obligatorio
  operator_id?: string;    // opcional: si no viene, se toma del usuario autenticado
};

function normalizeReason(raw: unknown) {
  const s = String(raw ?? "").trim();
  if (!s) throw new Error("El motivo de rechazo es obligatorio.");
  return s.slice(0, 1000);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  const supabase = await createClient();
  const { id: prestamoId } = await params;        

  const { data: auth, error: authErr } = await supabase.auth.getUser();
  if (authErr || !auth?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  const currentUserId = auth.user.id;

  let body: RejectBody;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "JSON inválido" }, { status: 400 }); }

  let reason: string;
  try { reason = normalizeReason(body.reason); }
  catch (e: unknown) { return NextResponse.json({ error: e instanceof Error ? e.message : "Error desconocido" }, { status: 400 }); }

  // 2) Préstamo
  const { data: loan, error: loanErr } = await supabase
    .from("prestamos")
    .select("id, status, operator_id")
    .eq("id", prestamoId)          
    .single();

  if (loanErr || !loan) {
    return NextResponse.json({ error: loanErr?.message ?? "Préstamo no encontrado" }, { status: 404 });
  }

  const status = String(loan.status ?? "").toLowerCase();
  if (status === "confirmado") {
    return NextResponse.json({ error: "No se puede rechazar: ya está confirmado" }, { status: 409 });
  }

  // 3) Operador
  const operatorId = body.operator_id ?? currentUserId;
  if (loan.operator_id && loan.operator_id !== operatorId) {
    return NextResponse.json({ error: "El operador autenticado no coincide con el asignado al préstamo" }, { status: 403 });
  }

  // (opcional) rol
  const role = (auth.user.user_metadata?.app_role ?? "").toLowerCase();
  if (!["operator", "admin"].includes(role)) {
    return NextResponse.json({ error: "Permiso denegado: se requiere rol operator o admin" }, { status: 403 });
  }

  // 4) Limpiar cuotas (defensivo)
  const { error: delErr } = await supabase
    .from("quotas")
    .delete()
    .eq("prestamo_id", prestamoId);
  if (delErr) {
    return NextResponse.json({ error: `No se pudieron limpiar cuotas: ${delErr.message}` }, { status: 500 });
  }

  // 5) Rechazar
  const nowIso = new Date().toISOString();

  type PrestamoUpdate = {
    status: string;
    rejection_reason: string;
    decision_at: string;
    updated_at: string;
    operator_id: string;
  };

  const patch: PrestamoUpdate = {
    status: "rechazado",
    rejection_reason: reason,
    decision_at: nowIso,
    updated_at: nowIso,
    operator_id: loan.operator_id ?? operatorId,
  };

  const {  error: updErr } = await supabase
    .from("prestamos")
    .update(patch)
    .eq("id", prestamoId)
    .select()
    .single();

  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  return NextResponse.json("Prestamo rechazado correctamente", { status: 200 });
}
