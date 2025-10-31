// app/api/quotas/[id]/failure/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request, { params }: { params: { quotaId: string } }) {
  const { quotaId } = params;
  const { data: quota } = await supabase.from("quotas").select("*").eq("id", quotaId).single();

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/result?status=failure&loan=${quota?.prestamo_id}`
  );
}
