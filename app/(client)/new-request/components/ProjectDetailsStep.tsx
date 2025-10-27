import React from "react";
import { AlertCircle } from "lucide-react";
import {  useFormContext } from "react-hook-form";

export default function ProjectDetailsStep() {
  const { register,watch, formState: { errors } } = useFormContext();
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Cuéntanos sobre tu Proyecto
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
              Esta información nos ayuda a evaluar mejor tu solicitud
      </p>

      <div className="space-y-6">
        {/* Project Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Descripción del Proyecto *
          </label>
          <textarea
            {...register("projectDescription", { 
              required: "La descripción es requerida",
              maxLength: { value: 1000, message: "Máximo 1000 caracteres" }
            })}
            rows={6}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
              errors.projectDescription 
                ? "border-red-500 dark:border-red-400" 
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Describe en detalle cómo utilizarás el préstamo, qué objetivos buscas alcanzar, y cómo este financiamiento impactará en tu negocio..."
          />
          {errors.projectDescription && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.projectDescription.message as string}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {watch("projectDescription")?.length || 0} / 1000 caracteres
          </p>
        </div>

        {/* Expected ROI */}
        {/* <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Retorno de Inversión Estimado *
                  </label>
                  <select
                      {...register("estimatedROI", { 
              required: "Selecciona una opción",
            })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
              errors.estimatedROI 
                ? "border-red-500 dark:border-red-400" 
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
                      <option value="">Seleccionar...</option>
                      <option value="3-6">3 - 6 meses</option>
                      <option value="6-12">6 - 12 meses</option>
                      <option value="12-24">12 - 24 meses</option>
                      <option value="24+">Más de 24 meses</option>
                  </select>
                  {errors.estimatedROI && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.estimatedROI.message as string}
                  </p>
          )}
              </div> */}

        {/* Expected Revenue Increase */}
        {/* <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Incremento de Ingresos Esperado
                  </label>
                  <select
                      {...register("revenueIncrease")}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
                      <option value="">Seleccionar...</option>
                      <option value="0-10">0% - 10%</option>
                      <option value="10-25">10% - 25%</option>
                      <option value="25-50">25% - 50%</option>
                      <option value="50+">Más de 50%</option>
                  </select>
              </div> */}

        {/* Additional Collateral */}
        {/* <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      ¿Ofreces garantías adicionales?
                  </label>
                  <div className="space-y-3">
                      {[
              { value: "none", title: "Sin garantías adicionales", description: "Evaluación basada en historial crediticio" },
              { value: "property", title: "Propiedad inmueble", description: "Puede mejorar las condiciones del préstamo" },
              { value: "equipment", title: "Equipamiento o maquinaria", description: "Bienes de capital como respaldo" },
              { value: "contracts", title: "Contratos firmados", description: "Contratos con clientes que garantizan ingresos" }
            ].map((option) => (
                <label 
                    key={option.value}
                    className="flex items-start gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer bg-white dark:bg-gray-900"
              >
                    <input
                        type="radio"
                        {...register("collateral")}
                        value={option.value}
                        className="mt-1"
                        defaultChecked={option.value === "none"}
                />
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{option.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </div>
                </label>
            ))}
                  </div>
              </div> */}

        {/* Additional Notes */}
        {/* <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Comentarios Adicionales
                  </label>
                  <textarea
                      {...register("additionalNotes")}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      placeholder="Cualquier información adicional que consideres relevante para tu solicitud..."
          />
              </div> */}
      </div>
    </div>
  );
}
