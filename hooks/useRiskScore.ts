import { useQuery } from "@tanstack/react-query";

type RiskDto = {
  nombre: string;  
  score_promedio: number;
  nivel_riesgo: "Bajo" | "Moderado" | "Alto" | "Crítico";
  deuda_total_actual: number;
  historico: Array<{
    periodo: string;
    deuda_total: number;
    situacion_max: number;
    score: number;
  }>;
  fuente: string;
};

async function fetchRiskScore(cuit: string): Promise<RiskDto> {
  const res = await fetch(`/api/score/${cuit}`);
  if (!res.ok) throw new Error("Error al obtener score");
  return res.json();
}

export function useRiskScore(cuit: string, enabled: boolean) {
  return useQuery({
    queryKey: ["risk", cuit],
    queryFn: () => fetchRiskScore(cuit),
    enabled,
    staleTime: 1000 * 60 * 5,     // 5 min de caché
    refetchOnWindowFocus: false,  // ← evita refetch al cambiar de pestaña
    refetchOnReconnect: false,    // ← evita refetch al reconectar red
    retry: 1,                     // ← solo 1 re-intento si falla
  });
}