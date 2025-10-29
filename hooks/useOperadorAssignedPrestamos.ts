// hooks/useOperadorAssignedPrestamos.ts
import { useQuery } from "@tanstack/react-query";
import {PrestamoAssigned} from "@/app/types/types";

// type PrestamoAssigned = {
//   id: string;
//   monto: number;
//   currency: string;
//   term_months: number;
//   purpose: string;
//   status: "PENDIENTE" | "APROBADO" | "RECHAZADO";
//   submitted_at: string;
//   pyme: {
//     id: string;
//     company_name: string;
//     cuil_cuit: string;
//     annual_billing_estimated: number;
//     amount_employees: number;
//     merch_years: number;
//   };
// };

export default function useOperadorAssignedPrestamos() {
  return useQuery<PrestamoAssigned[]>({
    queryKey: ["operador", "assigned"],
    queryFn: async () => {
      const res = await fetch("/api/prestamo/assigned");
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Error al obtener préstamos asignados");
      }
      const data = await res.json();
      return data.prestamos; // ← importante: devolver el array interno
    },
    staleTime: 10_000,
  });
}