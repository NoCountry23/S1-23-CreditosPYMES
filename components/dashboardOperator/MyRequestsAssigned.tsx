"use client";
import { Search, FileText, Calendar, Eye, CheckCircle, XCircle } from "lucide-react";
import React, { useState } from "react";
import DetailedView from "./DetailedView";
import useOperadorAssignedPrestamos from "@/hooks/useOperadorAssignedPrestamos";
import type { PrestamoAssigned } from "@/app/types/types";

export default function MyRequestsAssigned() {
  const { data: prestamos, isLoading, error } = useOperadorAssignedPrestamos();
  const [selectedPrestamo, setSelectedPrestamo] = useState<PrestamoAssigned | null>(null);

  if (isLoading) return <p>Cargando préstamos asignados…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar empresa, CUIT o ID…"
            className="w-full pl-10 pr-4 py-2 border border-gray-500/50 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cards */}
      {prestamos?.map((p) => {
        const docs = p.pyme.support_documents ?? [];
        const docsOk = docs.length > 0 && docs.every((d) => d.status === "APPROVED");

        return (
          <div
            key={p.id}
            className="rounded-lg border border-gray-500/50 dark:bg-base-100 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{p.pyme.company_name}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">{p.status}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">ID Solicitud</p>
                    <p className="font-medium">{p.id.slice(0, 8)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Monto</p>
                    <p className="font-bold text-blue-600">
                      ${p.monto.toLocaleString()} {p.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fact. Anual</p>
                    <p className="font-medium">${p.pyme.annual_billing_estimated.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Score</p>
                    <p className="font-bold text-green-600">–</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Empleados</p>
                    <p className="font-medium">{p.pyme.amount_employees}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>
                      Docs:{" "}
                      {docsOk ? (
                        <span className="text-green-600 font-medium">Completos ✓</span>
                      ) : (
                        <span className="text-orange-600 font-medium">
                          {docs.length} archivo{docs.length === 1 ? "" : "s"}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Asignada el {new Date(p.submitted_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="ml-4 flex gap-2">
                {p.status === "PENDIENTE" && (
                  <button
                    onClick={() => setSelectedPrestamo(p)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Revisar
                  </button>
                )}
                {p.status === "APROBADO" && (
                  <button className="px-6 py-2 bg-green-100 text-green-700 rounded-lg cursor-default flex items-center gap-2 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Aprobado
                  </button>
                )}
                {p.status === "RECHAZADO" && (
                  <button className="px-6 py-2 bg-red-100 text-red-700 rounded-lg cursor-default flex items-center gap-2 font-medium">
                    <XCircle className="w-4 h-4" />
                    Rechazado
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal detalle */}
      {selectedPrestamo && (
        <DetailedView prestamo={selectedPrestamo} onClose={() => setSelectedPrestamo(null)} />
      )}
    </div>
  );
}