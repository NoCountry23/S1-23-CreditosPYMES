import React, { useEffect, useState } from "react";
import {  Calculator, AlertCircle } from "lucide-react";
import {  Controller, useFormContext } from "react-hook-form";

export default function LoanAmountStep() {
  const [calculatedPayment, setCalculatedPayment] = useState(0);
  const { watch, register, formState: { errors }, control } = useFormContext();
  const loanAmount = watch("loanAmount");
  const loanTerm = watch("loanTerm");

  useEffect(() => {
    if (loanAmount && loanTerm) {
      const rate = 0.45 / 12;
      const amount = parseFloat(loanAmount);
      const term = parseInt(loanTerm);
      const payment = amount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      setCalculatedPayment(payment);
    }
  }, [loanAmount, loanTerm]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Define tu Préstamo
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Indica el monto que necesitas y en cuánto tiempo planeas pagarlo
      </p>

      <div className="space-y-8">
        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Monto del Préstamo *
          </label>
          <div className="relative">
            <Controller
              name='loanAmount'
              control={control}
              rules={{
                required: "El monto es requerido",
                max:{
                  value: 10000000,
                  message: "El monto no puede ser mayor a $10.000.000"
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.loanAmount
                      ? "border-red-500"
                      : "border-gray-500"
                  }`}
                  value={Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",

                    minimumFractionDigits: 0,
                  }).format(Number(field.value || 0))}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(raw);
                  }}
                />
              )}
            />
          </div>
          {errors.loanAmount && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.loanAmount.message as string}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Máximo $10.000.000
          </p>
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Plazo de Pago *
          </label>
          <select
            {...register("loanTerm", { 
              required: "Selecciona un plazo",
            })}
            className={`w-full px-4 py-4 text-lg border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all  bg-input text-gray-900 dark:text-white ${
              errors.loanTerm 
                ? "border-red-500 dark:border-red-400" 
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <option value="">Seleccionar plazo...</option>
            <option value="12">12 meses (1 año)</option>
            <option value="24">24 meses (2 años)</option>
            <option value="36">36 meses (3 años)</option>
            <option value="48">48 meses (4 años)</option>
            <option value="60">60 meses (5 años)</option>
          </select>
          {errors.loanTerm && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.loanTerm.message as string}
            </p>
          )}
        </div>

        {/* Loan Purpose */}
        {/* <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Destino del Préstamo *
          </label>
          <select
            {...register("loanPurpose", { 
              required: "Selecciona un destino",
            })}
            className={`w-full px-4 py-4 text-lg border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
              errors.loanPurpose 
                ? "border-red-500 dark:border-red-400" 
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <option value="">Seleccionar destino...</option>
            <option value="capital_trabajo">Capital de Trabajo</option>
            <option value="equipamiento">Inversión en Equipamiento</option>
            <option value="expansion">Expansión del Negocio</option>
            <option value="infraestructura">Infraestructura</option>
            <option value="vehiculos">Adquisición de Vehículos</option>
            <option value="tecnologia">Tecnología e Innovación</option>
            <option value="refinanciacion">Refinanciación de Deudas</option>
            <option value="otro">Otro</option>
          </select>
          {errors.loanPurpose && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.loanPurpose.message as string}
            </p>
          )}
        </div> */}

        {/* Calculator Display */}
        {loanAmount && loanTerm && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Resumen del Préstamo
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cuota Mensual</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${calculatedPayment.toLocaleString("es-AR", { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total a Pagar</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${(calculatedPayment * parseInt(loanTerm)).toLocaleString("es-AR", { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tasa TNA</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">45%</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
              * Valores estimados sujetos a aprobación crediticia final
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
