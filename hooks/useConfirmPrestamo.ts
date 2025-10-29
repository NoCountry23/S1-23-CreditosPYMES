// hooks/useConfirmPrestamo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useConfirmPrestamo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (prestamoId: string) => {
      const res = await fetch(`/api/prestamo/${prestamoId}/confirm`, { method: "POST" });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "No se pudo confirmar");
      }
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["operador", "assigned"] });
    },
  });
};