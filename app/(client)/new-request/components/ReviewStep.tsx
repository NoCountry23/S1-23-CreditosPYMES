import React, { useEffect, useState } from "react";
import { DollarSign, FileText, Info, AlertCircle } from "lucide-react";
import {  useFormContext } from "react-hook-form";

export default function ReviewStep() {
  const [calculatedPayment, setCalculatedPayment] = useState(0);
  const { watch, register, formState: { errors }} = useFormContext();
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
        Revisa tu Solicitud
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Verifica que toda la información sea correcta antes de enviar
      </p>

      <div className="space-y-6">
        {/* Loan Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Resumen del Préstamo
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Monto Solicitado</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${parseFloat(watch("loanAmount") || 0).toLocaleString("es-AR")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Plazo</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {watch("loanTerm")} meses
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cuota Mensual Estimada</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${calculatedPayment.toLocaleString("es-AR", { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total a Pagar</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${(calculatedPayment * parseInt(watch("loanTerm") || 0)).toLocaleString("es-AR", { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Detalles del Proyecto
          </h3>
          <div className="space-y-4">
           
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Descripción</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{watch("projectDescription")}</p>
            </div>
          
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 p-6 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
                Información Importante
              </h4>
              <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-2">
                <li>• Tu solicitud será revisada por nuestro equipo en 24-48 horas hábiles</li>
                <li>• Recibirás notificaciones por email sobre el estado de tu solicitud</li>
                <li>• Los valores mostrados son estimaciones sujetas a aprobación final</li>
                <li>• Podemos solicitar documentación adicional durante el proceso</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("acceptTerms", { 
                required: "Debes aceptar los términos y condiciones" 
              })}
              className="mt-1 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Acepto los{" "}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline">
                  términos y condiciones
                </a>{" "}
                del préstamo y autorizo a FinanciaPYME a:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 ml-4">
                <li>• Consultar mis datos en centrales de riesgo crediticio</li>
                <li>• Verificar la información proporcionada</li>
                <li>• Contactarme por email, teléfono o SMS</li>
              </ul>
            </div>
          </label>
          {errors.acceptTerms && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1 ml-7">
              <AlertCircle className="w-4 h-4" />
              {errors.acceptTerms.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
