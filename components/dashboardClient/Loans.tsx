"use client";

import { usePyme } from "@/hooks/usePyme";
import { useQuery } from "@tanstack/react-query";
import { LoanCard, LoanCardSkeleton } from "./LoanCard";
import EmptyState from "./EmptyState";
import { CreditCard, Plus } from "lucide-react";
import Link from "next/link";
import { Prestamo } from "@/lib/types/database";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function Loans() {
  const router = useRouter(); 
  const { pyme } = usePyme();
  const {data: user} = useUser();
  const { data: activeLoans, isLoading, error } = useQuery({
    queryKey: ["loans", pyme?.id, user?.id],
    queryFn: async () => {
      const res = await fetch("/api/prestamo/by-pyme/" + pyme?.id);
      if (!res.ok) throw new Error("Error al cargar préstamos");
      const data = await res.json();
      return data as Prestamo[];
    },
    enabled: !!pyme?.id && !!user?.id,
    refetchOnWindowFocus: true
  });

  // Loading State
  if (isLoading || !activeLoans) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mis Préstamos
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoanCardSkeleton count={2} />
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Mis Préstamos
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <p className="text-red-800 dark:text-red-400">
            Error al cargar los préstamos. Por favor, intenta nuevamente.
          </p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!isLoading && activeLoans &&  activeLoans.length === 0 ) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mis Préstamos
          </h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <EmptyState
            title="No tienes préstamos activos"
            description="Solicita tu primer préstamo para hacer crecer tu negocio"
            icon={<CreditCard className="w-8 h-8 text-gray-400 dark:text-gray-500" />}
            actionButton={{
              label: "Solicitar Préstamo",
              onClick: () => {
                // Navegar a la página de nueva solicitud
                router.push("/new-request");
              }
            }}
          />
        </div>
      </div>
    );
  }

  // Content with Loans
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mis Préstamos
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {activeLoans?.length} {activeLoans?.length === 1 ? "préstamo activo" : "préstamos activos"}
          </p>
        </div>
        <Link
          href="/new-request"
          className="px-4 py-2 bg-blue-600  rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-white"
        >
          <Plus className="w-4 h-4 " />
                  Nueva Solicitud
        </Link>
      </div>

      {/* Loans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeLoans?.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </div>
    </div>
  );
}
