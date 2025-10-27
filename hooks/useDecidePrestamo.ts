// hooks/useDecidePrestamo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Decision = "APPROVE" | "REJECT";

export const useDecidePrestamo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, decision, reason }: { id: string; decision: Decision; reason?: string }) => {
      const endpoint = decision === "APPROVE" ? `/api/prestamo/${id}/approve` : `/api/prestamo/${id}/reject`;
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "No se pudo actualizar");
      }
      return res.json();
    },
    onSuccess: () => {
      // refresca la lista de asignados
      qc.invalidateQueries({ queryKey: ["operador", "assigned"] });
    },
  });
};