"use client";

import {
  AlertTriangle,
  Calendar,
  // Search, 
  User
} from "lucide-react";
import React, { useState } from "react";
import { usePymesWithPendingLoans } from "@/hooks/usePymesWithPendingLoans";
import { Loader2 } from "lucide-react";
import { useAssignPrestamo } from "@/hooks/useAssignPrestamo";

export default function RequestsUnassigned() {
  const [filterPriority, setFilterPriority] = useState<"all" | "high" | "medium" | "low">("all");
  const [selected, setSelected] = useState<{ pymeId: string; prestamoId: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // ← nuevo

  const { data: pymes, isLoading, error } = usePymesWithPendingLoans();
  const { mutate: assign, isPending } = useAssignPrestamo();

  interface Prestamo {
    id: string;
    monto: number;
    purpose: string;
    created_at: string;
    priority: "high" | "medium" | "low";
    daysWaiting: number;
    pyme: Pyme;
  }

  interface Pyme {
    id: string;
    company_name: string;
    cuil_cuit: string;
    industry: string;
    prestamosPendientes: Prestamo[];
  }

  const prestamosFlat =
    pymes?.flatMap((pyme: Pyme) =>
      pyme.prestamosPendientes.map((pr: Prestamo) => ({
        ...pr,
        pyme,
      }))
    ) ?? [];

  if (isLoading)
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="alert alert-error">
        Error al cargar préstamos pendientes sin operador.
      </div>
    );

  if (prestamosFlat.length === 0)
    return <div className="alert alert-info">No hay préstamos pendientes sin operador.</div>;

  const sorted = prestamosFlat.sort((a: Prestamo, b: Prestamo) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const filtered = sorted.filter((pr: Prestamo) =>
    filterPriority === "all" ? true : pr.priority === filterPriority
  );

  const handleAssignClick = (pymeId: string, prestamoId: string) => {
    setSelected({ pymeId, prestamoId });
    setErrorMsg(null); // limpiamos error previo
  };

  const handleAssignConfirm = () => {
    if (!selected) return;

    assign(selected.prestamoId, {
      onSuccess: () => {
        setSelected(null);
        setErrorMsg(null);
      },
      onError: (err: Error) => {
        // Mostramos el mensaje que vino del backend
        setErrorMsg(err.message || "No se pudo asignar el préstamo.");
      },
    });
  };

  return (
    <div className="">
      {/* Filtro por prioridad */}
      <div className="flex gap-4 mb-6">
        <select
          className="px-4 py-2 border   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value as "all" | "high" | "medium" | "low")}
        >
          <option value="all">Todas las prioridades</option>
          <option value="high">Alta (≥ 3 días)</option>
          <option value="medium">Media (2 días)</option>
          <option value="low">Baja (≤ 1 día)</option>
        </select>
      </div>
      <div className="space-y-4">
        {/* Tarjetas: 1 por préstamo */}
        {filtered.map((pr: Prestamo) => {
          const pyme = pr.pyme;
          const priority = pr.priority;
          const days = pr.daysWaiting;

          return (
            <div
              key={pr.id}
              className="rounded-lg border border-gray-500/50 dark:bg-transparent p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{pyme.company_name}</h3>

                    {/* Chip de prioridad */}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priority === "high"
                        ? "bg-red-100 text-red-800"
                        : priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800" }`}
                    >
                      {priority === "high" && <AlertTriangle className="w-3 h-3" />}
                      {priority === "high" ? "Alta" : priority === "medium" ? "Media" : "Baja"}
                    </span>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500">ID Préstamo</p>
                      <p className="font-medium text-sm">{pr.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CUIT</p>
                      <p className="font-medium text-sm">{pyme.cuil_cuit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Monto</p>
                      <p className="font-bold text-blue-600">${pr.monto.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Rubro</p>
                      <p className="font-medium text-sm">{pyme.industry}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs text-gray-500">Destino</p>
                    <p className="text-sm text-gray-700">{pr.purpose}</p>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-4 h-4" />
                    Solicitado: {new Date(pr.created_at).toLocaleDateString("es-AR")} ({days} días)
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleAssignClick(pyme.id, pr.id)}
                    className="btn btn-sm text-xs md:text-sm md:btn-md border-0 ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden md:flex">Asignarme</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de confirmación + error */}
      {selected && (
        <div className={`modal ${selected ? "modal-open" : ""}`}>
          <div className="modal-box bg-white dark:bg-gray-700">
            <h3 className="font-bold text-md md:text-lg">¿Querés asignarte este préstamo?</h3>
            <p className="py-4 text-xs md:text-md">Una vez asignado, aparecerá en &quot;Mis solicitudes asignadas&quot;.</p>

            {errorMsg && (
              <div className="alert alert-error mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="modal-action">
              <button className="btn btn-ghost btn-sm md:btn-md" onClick={() => { setSelected(null); setErrorMsg(null); }}>
                Cancelar
              </button>
              <button className="btn btn-ghost btn-sm md:btn-md border-0 ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium" onClick={handleAssignConfirm} disabled={isPending}>
                {isPending ? <span className="loading loading-xs"></span> : "Asignarme"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}