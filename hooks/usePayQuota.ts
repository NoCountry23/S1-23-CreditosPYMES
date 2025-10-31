// hooks/usePayQuota.ts
import { useMutation } from "@tanstack/react-query";
import { Quota } from "@/lib/types/database";

export const usePayQuota = () => {
  return useMutation({
    mutationFn: async (quota: Quota) => {
      const res = await fetch(`/api/quotas/${quota.id}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: quota.amount }),
      });
      if (!res.ok) throw new Error("Error al procesar el pago");
      const data = await res.json();
      // redirigimos al checkout
      if (data.init_point) window.location.href = data.init_point;
      return data;
    },
  });
};
