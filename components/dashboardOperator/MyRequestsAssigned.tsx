"use client";
import {
  Search,
  FileText,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import DetailedView from "./DetailedView";
import useOperadorAssignedPrestamos from "@/hooks/useOperadorAssignedPrestamos";

export default function MyRequestsAssigned() {
  const { data: prestamos, isLoading, error } = useOperadorAssignedPrestamos();
  const [selectedRequest, setSelectedRequest] = useState<{ id: string } | null>(
    null,
  );

  if (isLoading) return <p>Cargando préstamos asignados…</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Pedidos asignados al operador
  // const myRequests = [
  //   {
  //     id: "SOL-2025-0148",
  //     company: "Logística Express S.R.L.",
  //     cuit: "30-71234572-3",
  //     amount: 950000,
  //     purpose: "Flota de Vehículos",
  //     assignedDate: "2025-10-10",
  //     status: "in_review",
  //     industry: "Logística",
  //     revenue: 3500000,
  //     employees: 28,
  //     yearsInBusiness: 7,
  //     creditScore: 750,
  //     documentsComplete: true,
  //   },
  //   {
  //     id: "SOL-2025-0145",
  //     company: "Textil Modernos",
  //     cuit: "30-71234573-4",
  //     amount: 720000,
  //     purpose: "Maquinaria",
  //     assignedDate: "2025-10-09",
  //     status: "approved",
  //     industry: "Textil",
  //     revenue: 2800000,
  //     employees: 35,
  //     yearsInBusiness: 12,
  //     creditScore: 820,
  //     documentsComplete: true,
  //   },
  //   {
  //     id: "SOL-2025-0142",
  //     company: "Imprenta Digital Plus",
  //     cuit: "30-71234574-5",
  //     amount: 380000,
  //     purpose: "Capital de Trabajo",
  //     assignedDate: "2025-10-08",
  //     status: "rejected",
  //     industry: "Servicios",
  //     revenue: 950000,
  //     employees: 8,
  //     yearsInBusiness: 3,
  //     creditScore: 580,
  //     documentsComplete: false,
  //   },
  // ];

  const handleViewDetails = (request: { id: string }) => {
    setSelectedRequest(request);
  };
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar en mis solicitudes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-500/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* My Requests Cards */}
      {prestamos?.map((p) => (
        <div
          key={p.id}
          className=" rounded-lg border border-gray-500/50  dark:bg-base-100 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold ">{p.pyme.company_name}</h3>
                {p.status}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500">ID Solicitud</p>
                  <p className="font-medium text-sm">{p.id.slice(0, 8)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Monto</p>
                  <p className="font-bold text-blue-600">
                  ${p.monto.toLocaleString()} {p.currency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Facturación Anual</p>
                  <p className="font-medium text-sm">
                  ${p.pyme.annual_billing_estimated.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Score</p>
                  <p className="font-bold text-green-600">
                    {/* {request.creditScore} */}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Empleados</p>
                  <p className="font-medium text-sm">{p.pyme.amount_employees}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Docs:{" "}
                    {/* {request.documentsComplete ? (
                      <span className="text-green-600 font-medium">
                        Completos ✓
                      </span>
                    ) : (
                      <span className="text-orange-600 font-medium">
                        Incompletos
                      </span>
                    )} */}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  Asignada el {new Date(p.submitted_at).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="ml-4 flex gap-2">
              {p.status === "PENDIENTE" && (
                <button
                  onClick={() => handleViewDetails(p)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
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
      ))}

      {/* Detailed View Modal */}
      {selectedRequest && (
        <DetailedView
          request={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      )}
    </div>
  );
}
