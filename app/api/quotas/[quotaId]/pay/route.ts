import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase server-side con Service Role Key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request, context: { params: Promise<{ quotaId: string }> }) {
  const { quotaId } = await context.params;

  try {
    // 1️⃣ Obtener la cuota desde Supabase
    const { data: quota, error } = await supabase
      .from("quotas")
      .select("*")
      .eq("id", quotaId)
      .single();

    if (error || !quota) {
      return NextResponse.json({ error: "Cuota no encontrada" }, { status: 404 });
    }

    // 2️⃣ Crear la preferencia para Mercado Pago
    const preference = {
      items: [
        {
          title: `Cuota #${quota.numero_cuota} del préstamo ${quota.prestamo_id}`,
          quantity: 1,
          unit_price: Number(quota.amount), // asegurar que sea number
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "https://avance-profesional.vercel.app/api/s23pyme",
        failure: `http://localhost:3000/api/quotas/${quotaId}/failure`,
        pending: `http://localhost:3000/api/quotas/${quotaId}/pending`,
      },
      auto_return: "approved",
      metadata: { quota_id: quotaId },
    };

    // 3️⃣ Llamada al API de Mercado Pago
    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "Error al crear la preferencia" }, { status: res.status });
    }

    // 4️⃣ Devolver init_point y preferenceId (útil para el frontend)
    return NextResponse.json({
      init_point: data.init_point,
      preferenceId: data.id,
    });

  } catch (err: unknown) {
    console.error("Error creando preferencia:", err);

    const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
          ? err
          : "Error desconocido al crear la preferencia";

    return NextResponse.json(
      { error: "Error al crear la preferencia", details: message },
      { status: 500 }
    );
  }
}
