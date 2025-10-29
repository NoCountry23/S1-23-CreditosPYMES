"use client";

import { useState } from "react";
import { useRiskScore } from "@/hooks/useRiskScore";

type Props = {
  cuit: string;
  ingresoMensual?: number; // para ratio deuda/ingreso
};

const riskColor = (nivel: string) => {switch (nivel) {
case "Bajo":      return "badge-success"; 
case "Moderado":  return "badge-warning";
case "Alto":      return "badge-error";
default:          return "badge-error";
}
};

export default function RiskAnalysis({ cuit, ingresoMensual = 1 }: Props) {
  const [asked, setAsked] = useState(false);
  const { data, isFetching, isError, refetch } = useRiskScore(cuit, asked);

  // Placeholder mientras no se pide nada
  const placeholder = {
    score_promedio: 0,
    nivel_riesgo: "Sin evaluar" as const,
    deuda_total_actual: 0,
    nombre: "",
    fuente: "BCRA",
  };

  const info = data || placeholder;
  const ratio = info.deuda_total_actual / ingresoMensual;

  return (
    <div className=" bg-transparent rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Análisis de Riesgo</h3>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            if (!asked) setAsked(true);
            else refetch();
          }}
          disabled={isFetching}
        >
          {isFetching ? <span className="loading loading-spinner loading-xs" /> : "Actualizar"}
        </button>
      </div>

      {isError && (
        <div className="text-error text-sm mb-4">No se pudo obtener el score</div>
      )}

      <div className="space-y-4">
        {/* Ratio deuda/ingreso */}
        <div>
          <p className="text-sm text-base-content/70 mb-1">Ratio Deuda/Ingreso</p>
          <div className="flex items-center gap-3">
            <progress
              className="progress progress-accent flex-1"
              value={Math.min(ratio * 100, 100)}
              max="100"
            />
            <span className="font-bold">{(ratio * 100).toFixed(0)} %</span>
          </div>
        </div>

        {/* Score y nivel */}
        <span className="text-[8px] text-gray-600">{info.nombre}</span>
        <div>
          <p className="text-sm text-base-content/70">Score BCRA</p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl">{info.score_promedio}</span>
            <div className={`badge badge-sm font-semibold ${riskColor(info.nivel_riesgo)}`}>
              {info.nivel_riesgo}
            </div>
            
          </div>
        </div>

        {/* Deuda actual */}
        <div>
          <p className="text-sm text-base-content/70">Deuda total actual</p>
          <p className="font-semibold">
            $ {info.deuda_total_actual.toLocaleString("es-AR")}
          </p>
        </div>

        {/* Historico mini tabla (opcional) */}
        {/* {data && (
          <div className="overflow-x-auto mt-4">
            <table className="table table-xs ">
              <thead>
                <tr>
                  <th className=" text-gray-600">Período</th>
                  <th className="text-right text-gray-600">Deuda ($)</th>
                  <th className="text-right text-gray-600">Score</th>
                </tr>
              </thead>
              <tbody>
                {data.historico.map((h) => (
                  <tr key={h.periodo}>
                    <td className="text-gray-600">{h.periodo}</td>
                    <td className="text-right text-gray-600">{h.deuda_total.toLocaleString("es-AR")}</td>
                    <td className="text-right text-gray-600">{h.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}
      </div>
      <span className="text-center text-[10px] text-gray-600 mt-4 block">{info.fuente}</span>
    </div>
  );
}