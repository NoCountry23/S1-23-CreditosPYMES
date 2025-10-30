"use client";

import { useParams } from "next/navigation";
import { usePrestamoDetails } from "@/hooks/usePrestamoDetails";
import  useFormatAmount  from "@/hooks/useFormatAmount";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { 
  Calendar, 
  DollarSign, 
  FileText, 
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import DownloadContract from "./components/DownloadContract";
import Quotas from "./components/Quotas";

export default function LoanDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, error } = usePrestamoDetails(id);
  const formatAmount = useFormatAmount;
  console.log(data, "data");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
        <Skeleton className="h-96 mt-6" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p>Error al cargar los detalles del préstamo</p>
      </div>
    );
  }

  const { prestamo, quotas, contract } = data;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold ">Detalles del Préstamo</h1>
            <p className="text-sm text-gray-500 mt-1">ID: {prestamo.id}</p>
          </div>
        </div>
        <span className={`px-3 py-1 w-fit h-fit ${prestamo.status?.toLowerCase() === "confirmado" && "bg-green-500" } ${prestamo.status?.toLowerCase() === "pendiente" && "bg-yellow-500" } ${prestamo.status?.toLowerCase() === "rechazado" && "bg-red-500" }  backdrop-blur-sm rounded-full text-sm font-medium`}>
          {prestamo.status?.toUpperCase()}
        </span>
      </div>

      {/* Información General */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Información Financiera
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Monto Solicitado:</span>
              <span className="text-lg font-semibold">
                {formatAmount(prestamo.monto)}
              </span>
            </div>
            {prestamo.monto_final && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Monto Final:</span>
                <span className="text-lg font-semibold text-green-600">
                  {formatAmount(prestamo.monto_final)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Plazo:</span>
              <span className="font-medium">{prestamo.term_months} meses</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Cantidad de Cuotas:</span>
              <span className="font-medium">{prestamo.cant_cuo} cuotas</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Moneda:</span>
              <span className="font-medium">{prestamo.currency}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Fechas Importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Fecha de Solicitud:</span>
              <span className="font-medium">
                {format(new Date(prestamo.created_at), "dd MMM yyyy", { locale: es })}
              </span>
            </div>
            {prestamo.assigned_at && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Fecha de Asignación:</span>
                <span className="font-medium">
                  {format(new Date(prestamo.assigned_at), "dd MMM yyyy", { locale: es })}
                </span>
              </div>
            )}
            {prestamo.decision_at && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Fecha de Decisión:</span>
                <span className="font-medium">
                  {format(new Date(prestamo.decision_at), "dd MMM yyyy", { locale: es })}
                </span>
              </div>
            )}
            {contract?.signed_at && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Fecha de Firma:</span>
                <span className="font-medium text-green-600">
                  {format(new Date(contract.signed_at), "dd MMM yyyy", { locale: es })}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {prestamo.status === "confirmado" && prestamo.env_docusign_id && (
        <DownloadContract env_docusign_id={prestamo.env_docusign_id} loanId={id} />
      )}
      {
        prestamo.status === "pendiente" && (
          <div className='text-sm text-yellow-800 dark:text-yellow-400 space-y-2 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 p-6 rounded-r-lg my-4'>
            <p className='font-semibold'>Prestamo pendiente</p>
            {prestamo.operator_id ? (
              <p>Ya hay un operador asignado y está revisando tu solicitud</p>  
            ): 
                
              <p>Todavia no hay un operador asignado </p>
            }
          </div>
        )
      }
      {prestamo.rejection_reason && (

        <div className='text-sm my-4 text-red-800 dark:text-red-400 space-y-2 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 dark:border-red-500 p-6 rounded-r-lg '>
          <p className='font-semibold'>Motivo de rechazo</p>
          <p>{prestamo.rejection_reason}</p>
        </div>
      )}
      {/* Propósito */}
      {prestamo.purpose && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Propósito del Préstamo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">{prestamo.purpose}</p>
          </CardContent>
        </Card>
      )}

      {/* Plan de Cuotas */}
      {quotas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Plan de Cuotas</CardTitle>
            <CardDescription>
              Detalle de todas las cuotas del préstamo
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Resumen */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4  rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500">Monto Solicitado</p>
                <p className="text-lg font-semibold">
                  {formatAmount(prestamo.monto)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Intereses anual</p>
                <p className="text-lg font-semibold text-orange-600">
                  % {prestamo.interes * 100}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Total a Pagar</p>
                <p className="text-lg font-semibold text-blue-600">
                  {formatAmount(prestamo.monto_final)}
                </p>
              </div>
            </div>

            {/* Tabla de Cuotas */}
            {quotas && quotas.length > 0 && (
              <Quotas quotas={quotas} />
              
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
