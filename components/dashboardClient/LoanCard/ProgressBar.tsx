import { Quota } from "@/lib/types/database";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function ProgressBar({ loanId }: { loanId: string }) {
  const {data: quotas, error, isLoading} =useQuery({
    queryKey: ["loan", loanId],
    queryFn: async () => {
      const res = await fetch("/api/prestamo/" + loanId + "/quotas");
      if (!res.ok) throw new Error("Error al cargar préstamo");
      const data = await res.json();
      return data  as Quota[];
    },
    enabled: !!loanId,
    refetchOnWindowFocus: true
  });
  if (error || !quotas) {
    return null;
  }
  if (isLoading) {
    return <p>Cargando…</p>;
  }
  
  const quotasPaid = quotas.filter((q) => q.status?.toLowerCase() === "paid");
  const progressPercentage = (quotasPaid.length / quotas.length) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Progreso del Préstamo</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {quotasPaid.length} de {quotas.length} cuotas pagadas
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 h-3 rounded-full transition-all duration-500 shadow-inner"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
