"use client";

import { usePayQuota } from "@/hooks/usePayQuota";
import { Quota } from "@/lib/types/database";

export default function PayButton({ quota }: { quota: Quota }) {
  const pay = usePayQuota();

  return (
    <button
      className="btn btn-primary btn-xs"
      onClick={() => pay.mutate(quota)}
      disabled={pay.isPending}
    >
      {pay.isPending ? "Procesando…" : "Pagar"}
    </button>
  );
}