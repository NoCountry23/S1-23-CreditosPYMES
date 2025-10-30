import { Prestamo, Quota } from "@/lib/types/database";
import { useQuery } from "@tanstack/react-query";

interface Contract {
  envelope_id: string;
  status: string;
  sent_at: string;
  signed_at?: string;
  document_url?: string;
  created_at: string;
}

interface PrestamoDetails {
  prestamo: Prestamo;
  quotas: Quota[];
  contract: Contract | null;
}

export const usePrestamoDetails = (prestamoId: string | undefined) => {
  return useQuery<PrestamoDetails>({
    queryKey: ["prestamo-details", prestamoId],
    queryFn: async () => {
      if (!prestamoId) throw new Error("ID de préstamo requerido");
      
      const response = await fetch(`/api/prestamo/${prestamoId}/details`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al obtener detalles del préstamo");
      }
      
      return response.json();
    },
    enabled: !!prestamoId,
    refetchOnWindowFocus: true,
  });
};
