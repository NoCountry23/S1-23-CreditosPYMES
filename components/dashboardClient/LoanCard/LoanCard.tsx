"use client";

import useFormatAmount from "@/hooks/useFormatAmount";
import { Prestamo } from "@/lib/types/database";
import { CreditCard } from "lucide-react";
import ProgressBar from "./ProgressBar";

export default function LoanCard({ loan }: {loan:Prestamo}) {
  const formatAmount = useFormatAmount;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-6 text-white">
        <div className="flex  flex-col md:flex-row justify-between mb-2">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Préstamo {loan.id || "Activo"}</h3>
          </div>
          <span className={`px-3 py-1 w-fit h-fit ${loan.status?.toLowerCase() === "confirmado" && "bg-green-500" } ${loan.status?.toLowerCase() === "pendiente" && "bg-yellow-500" } ${loan.status?.toLowerCase() === "rechazado" && "bg-red-500" }  backdrop-blur-sm rounded-full text-sm font-medium`}>
            {loan.status?.toUpperCase()}
          </span>
        </div>
        {loan.purpose && (
          <p className="text-blue-100 text-sm">{loan.purpose}</p>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Amounts Grid */}
        <div className="grid grid-flow-row md:grid-flow-col gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monto Original</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatAmount(loan.monto)}
            </p>
          </div>
          {loan.status === "confirmado" && (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monto Final</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatAmount(loan.monto_final )} 
              </p>
            </div>
          )}
          {
            loan.status === "pendiente" && (
              <>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cantidad de cuotas</p>
                  <p className="text-2xl font-bold  text-blue-600 dark:text-blue-400">
                    {loan.term_months}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Interés anual</p>
                  <p className="text-2xl font-bold  text-blue-600 dark:text-blue-400">
                    {loan.interes * 100}%
                  </p>
                </div>
              </>
            )
          }
        </div>
        {loan.rejection_reason && (

          <div className='text-sm text-red-800 dark:text-red-400 space-y-2 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 dark:border-red-500 p-6 rounded-r-lg max-h-28  overflow-y-auto'>
            <p className='font-semibold'>Motivo de rechazo</p>
            <p>{loan.rejection_reason}</p>
          </div>
        )}
        {/* Progress Bar */}
        {loan.status === "confirmado" && (
          
          <ProgressBar loanId={loan.id} />
        )}
        {
          loan.status === "pendiente" && (
            <div className='text-sm text-yellow-800 dark:text-yellow-400 space-y-2 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 p-6 rounded-r-lg'>
              <p className='font-semibold'>Prestamo pendiente</p>
              {loan.operator_id ? (
                <p>Ya hay un operador asignado y está revisando tu solicitud</p>  
              ): 
                
                <p>Todavia no hay un operador asignado </p>
              }
            </div>
          )
        }
      </div>
    </div>
  );
}
