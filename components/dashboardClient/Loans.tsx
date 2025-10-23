import React from "react";

export default function Loans({
  activeLoan,
}: {
  activeLoan: {
    totalAmount: number;
    remainingBalance: number;
    interestRate: number;
    term: number;
    monthsPaid: number;
    monthsRemaining: number;
    nextPaymentDate: string;
    monthlyPayment: number;
  };
}) {
  return (
    <div className="space-y-6">
      <div className=" rounded-xl shadow-sm p-6 dark bg-slate-500/10 dark:bg-base-100">
        <h2 className="text-xl font-bold  mb-6">Préstamo Activo</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm ">Monto Original</p>
            <p className="text-2xl font-bold ">
              ${activeLoan.totalAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm ">Saldo Restante</p>
            <p className="text-2xl font-bold text-blue-600">
              ${activeLoan.remainingBalance.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm ">Tasa de Interés</p>
            <p className="text-2xl font-bold ">
              {activeLoan.interestRate}% TNA
            </p>
          </div>
        </div>

        <div className=" rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm ">Progreso del Préstamo</span>
            <span className="text-sm font-medium ">
              {activeLoan.monthsPaid} de {activeLoan.term} cuotas pagadas
            </span>
          </div>
          <div className="w-full bg-gray-500/20 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{
                width: `${(activeLoan.monthsPaid / activeLoan.term) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-500/20 rounded-lg p-4">
            <p className="text-sm text-blue-500 font-medium mb-1">
              Próximo Pago
            </p>
            <p className="text-xl font-bold text-blue-600">
              ${activeLoan.monthlyPayment.toLocaleString()}
            </p>
            <p className="text-sm text-blue-500 mt-1">
              Vencimiento: {activeLoan.nextPaymentDate}
            </p>
          </div>
          <div className="bg-green-500/20 rounded-lg p-4">
            <p className="text-sm text-green-500 font-medium mb-1">
              Total Pagado
            </p>
            <p className="text-xl font-bold text-green-600">
              $
              {(
                activeLoan.monthlyPayment * activeLoan.monthsPaid
              ).toLocaleString()}
            </p>
            <p className="text-sm text-green-500 mt-1">Pagos al día ✓</p>
          </div>
        </div>
      </div>
    </div>
  );
}
