// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";
// import { buildInstallments } from "@/lib/schedule";

// export async function POST(
//   _req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const supabase = await createClient();
//   const { id } = params;

//   // 1) Leer préstamo
//   const { data: loan, error: loanErr } = await supabase
//     .from("prestamos")
//     .select("id, monto, interes, cant_cuo, status")
//     .eq("id", id)
//     .single();

//   if (loanErr || !loan) {
//     return NextResponse.json({ error: loanErr?.message ?? "Loan not found" }, { status: 404 });
//   }
//   if (loan.status === "confirmado") {
//     return NextResponse.json({ error: "Already confirmed" }, { status: 409 });
//   }

//   // 2) Generar cuotas en memoria
//   const confirmedAt = new Date();
//   const { cuotas } = buildInstallments({
//     principal: Number(loan.monto),
//     tna: Number(loan.interes),
//     n: Number(loan.cant_cuo),
//     confirmedAt
//   });

//   // 3) UPSERT de cuotas (idempotente)
//   const payload = cuotas.map(c => ({
//     prestamo_id: loan.id,
//     numero_cuota: c.numero_cuota,
//     fecha_vencimiento: c.fecha_vencimiento,
//     amount: c.amount,
//     interest: c.interest,
//     principal_comp: c.principal_comp,
//     balance: c.balance,
//     status: c.status
//   }));

//   const { error: upsertErr } = await supabase
//     .from("quotas")
//     .upsert(payload, { onConflict: "prestamo_id,numero_cuota", ignoreDuplicates: true });

//   if (upsertErr) {
//     // Intento “rollback suave”: borro las cuotas que pude haber creado
//     await supabase.from("quotas").delete().eq("prestamo_id", loan.id);
//     return NextResponse.json({ error: upsertErr.message }, { status: 500 });
//   }

//   // 4) Marcar préstamo como confirmado (una sola vez)
//   const { data: updated, error: updErr } = await supabase
//     .from("prestamos")
//     .update({ status: "confirmado", confirmed_at: confirmedAt.toISOString(), updated_at: new Date().toISOString() })
//     .eq("id", loan.id)
//     .neq("status", "confirmado") // evita “reconfirmar”
//     .select("*, quotas(*)")      // devuelve con cuotas
//     .single();

//   if (updErr) {
//     // Si fallara aquí, las cuotas quedaron creadas. Puedes decidir revertirlas:
//     await supabase.from("quotas").delete().eq("prestamo_id", loan.id);
//     return NextResponse.json({ error: updErr.message }, { status: 500 });
//   }

//   return NextResponse.json(updated, { status: 200 });
// }
// app/api/prestamos/[id]/confirm/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildInstallments } from "@/lib/schedule";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;

  // 1) Traer préstamo
  const { data: loan, error: loanErr } = await supabase
    .from("prestamos")
    .select("id, monto, interes, cant_cuo, status")
    .eq("id", id)
    .single();

  if (loanErr || !loan) {
    return NextResponse.json({ error: loanErr?.message ?? "Préstamo no encontrado" }, { status: 404 });
  }

  // normaliza status por las dudas (PENDIENTE vs pendiente)
  const status = String(loan.status ?? "").toLowerCase();
  if (status === "confirmado") {
    return NextResponse.json({ error: "Ya está confirmado" }, { status: 409 });
  }

  // 2) Generar cuotas (método francés) con los datos del préstamo
  const confirmedAt = new Date();
  const { cuotas } = buildInstallments({
    principal: Number(loan.monto),
    tna: Number(loan.interes),          // ya normalizado a decimal (0.45)
    n: Number(loan.cant_cuo),           // cantidad de cuotas
    confirmedAt
  });

  // 3) Calcular totales en memoria
  const montoFinal = Number(
    cuotas.reduce((acc, c) => acc + Number(c.amount), 0).toFixed(2)
  );
 
  // 4) UPSERT de cuotas (idempotente)
  const payload = cuotas.map(c => ({
    prestamo_id: loan.id,
    numero_cuota: c.numero_cuota,
    fecha_vencimiento: c.fecha_vencimiento,
    amount: c.amount,
    interest: c.interest,
    principal_comp: c.principal_comp,
    balance: c.balance,
    status: c.status
  }));

  const { error: upsertErr } = await supabase
    .from("quotas")
    .upsert(payload, {
      onConflict: "prestamo_id,numero_cuota",
      ignoreDuplicates: true,
    });

  if (upsertErr) {
    // rollback suave: borro cualquier resto
    await supabase.from("quotas").delete().eq("prestamo_id", loan.id);
    return NextResponse.json({ error: upsertErr.message }, { status: 500 });
  }

  // 5) Marcar préstamo confirmado + guardar totales
  const { data: updated, error: updErr } = await supabase
    .from("prestamos")
    .update({
      status: "confirmado",
     
      updated_at: new Date().toISOString(),
      monto_final: montoFinal,       // 👈 suma de todas las cuotas
      // opcional si tienes columna:
      // total_interes: totalInteres,
    })
    .eq("id", loan.id)
    .neq("status", "confirmado")
    .select("*, quotas(*), pyme(*)")
    .single();
  const {data: {user}}= await supabase.auth.admin.getUserById(updated.representante_id);
  const response = await fetch(
    "https://docusign-api-omega.vercel.app/signature/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user?.user_metadata,
        loan: updated,
        pyme: updated.pyme,
        quotas: updated.quotas
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Error al comunicarse con el servicio de firma");
  }
  if (updErr) {
    // revertimos cuotas si falla el update final
    await supabase.from("quotas").delete().eq("prestamo_id", loan.id);
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  return NextResponse.json(updated, { status: 200 });
}
