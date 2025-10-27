// hooks/usePrestamos.ts
import { useQuery } from "@tanstack/react-query";

export const usePrestamos = (
  pymeId?: string,
  status?: "PENDIENTE" | "APROBADO" | "RECHAZADO" | "CANCELADO"
) =>
  useQuery({
    queryKey: ["prestamos", pymeId, status],
    queryFn: () => {
      const usp = new URLSearchParams();
      if (pymeId) usp.set("pyme_id", pymeId);
      if (status) usp.set("status", status);
      return fetch(`/api/prestamo?${usp.toString()}`).then((r) => r.json());
    },
    enabled: !!pymeId,
  });