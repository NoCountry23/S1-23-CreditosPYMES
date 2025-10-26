// hooks/useAssignPrestamo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAssignPrestamo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (prestamoId: string) => {
      const res = await fetch(`/api/prestamo/${prestamoId}/assign`, { method: "PUT" });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "No se pudo asignar");
      }
      return res.json();
    },
    onSuccess: () => {
      // Sacamos de "no asignados" y refrescamos "mis asignados"
      qc.invalidateQueries({ queryKey: ["pymes", "pending-loans"] });
      qc.invalidateQueries({ queryKey: ["operador", "assigned"] });
    },
  });
};