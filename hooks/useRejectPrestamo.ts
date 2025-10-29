import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type RejectPayload = {
  reason: string;
  operator_id?: string;
};

async function rejectLoan({ id, ...body }: RejectPayload & { id: string }) {
  const res = await fetch(`/api/prestamo/${id}/reject`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Error al rechazar el préstamo");
  }
  return res.json();
}

export function useRejectPrestamo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: rejectLoan,
    onSuccess: () => {
      toast.success("Préstamo rechazado correctamente");
      qc.invalidateQueries({ queryKey: ["operador", "assigned"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
}