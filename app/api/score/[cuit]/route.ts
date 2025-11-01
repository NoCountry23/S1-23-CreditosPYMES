import { NextResponse } from "next/server";
import https from "https";

/* ------------------------------------------------------------------ */
/*  Tipos                                                             */
/* ------------------------------------------------------------------ */
type HistorialEntidad = {
  entidad?: string | null
  situacion?: number | null
  monto?: number | null
  procesoJud?: boolean
}

type HistorialPeriodo = {
  periodo?: string | null
  entidades?: HistorialEntidad[] | null
}

type HistorialDeuda = {
  identificacion?: number
  denominacion?: string | null
  periodos?: HistorialPeriodo[] | null
}

type HistorialResponse = {
  status: number
  results?: HistorialDeuda | null
}

/* ------------------------------------------------------------------ */
/*  Lógica de negocio                                                 */
/* ------------------------------------------------------------------ */
const SCORE_INITIAL = 100;

function calcScore(
  situacionMax: number,
  deudaTotal: number,
  tieneProcesoJudicial: boolean
): number {
  let score = SCORE_INITIAL;

  if (situacionMax > 1) score -= situacionMax * 10;
  if (deudaTotal > 10_000) score -= 10;
  if (deudaTotal > 50_000) score -= 20;
  if (deudaTotal > 100_000) score -= 30;
  if (tieneProcesoJudicial) score -= 25;

  return Math.max(score, 0);
}

function riskLevel(avg: number): string {
  if (avg > 80) return "Bajo";
  if (avg > 60) return "Moderado";
  if (avg > 40) return "Alto";
  return "Crítico";
}

/* ------------------------------------------------------------------ */
/*  HTTPS agent solo para desarrollo                                  */
/* ------------------------------------------------------------------ */
const httpsAgent =
  process.env.NODE_ENV === "development"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

/* ------------------------------------------------------------------ */
/*  Fetch nativo con https.request                                    */
/* ------------------------------------------------------------------ */
const BCRA_HISTORICA = (cuit: string) =>
  `https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/Historicas/${cuit}`;

class BcraError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function fetchBcra<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options: https.RequestOptions = {
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: "GET",
      agent: httpsAgent,
      headers: { "Content-Type": "application/json" },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch {
            reject(new Error("Respuesta inválida del BCRA"));
          }
        } else {
          reject(new BcraError(res.statusCode || 500, "Error al consultar BCRA"));
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}

/* ------------------------------------------------------------------ */
/*  Filtrar últimos 13 meses                                          */
/* ------------------------------------------------------------------ */
type HistoricItem = {
    periodo: string
    deuda_total: number
    situacion_max: number
    score: number
  }
  
function ultimos13Meses(historico: HistoricItem[]): HistoricItem[] {
  const hoy = new Date();
  const hace13Meses = new Date(hoy.getFullYear(), hoy.getMonth() - 13, 1);
  return historico.filter((h) => {
    const anio = Number(h.periodo.slice(0, 4));
    const mes = Number(h.periodo.slice(4, 6));
    const fechaPeriodo = new Date(anio, mes - 1, 1);
    return fechaPeriodo >= hace13Meses;
  });
}

/* ------------------------------------------------------------------ */
/*  Handler principal                                                 */
/* ------------------------------------------------------------------ */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cuit: string }> }
) {
  try {
    const { cuit } = await params;
    const trimmed = cuit.trim().replace(/-/g, "");;
  
    const bcra = await fetchBcra<HistorialResponse>(BCRA_HISTORICA(trimmed));
    const deuda = bcra.results;
    if (!deuda?.periodos?.length)
      return NextResponse.json({ error: "Sin historial" }, { status: 404 });
  
    const historic: HistoricItem[] = deuda.periodos.map((p) => {
      const entidades = p.entidades ?? [];
      const totalDebt = entidades.reduce((sum, e) => sum + (e.monto ?? 0), 0);
      const maxSituacion = Math.max(...entidades.map((e) => e.situacion ?? 0));
      const tieneProcesoJudicial = entidades.some((e) => e.procesoJud);
      const score = calcScore(maxSituacion, totalDebt, tieneProcesoJudicial);
  
      return {
        periodo: p.periodo!,
        deuda_total: totalDebt,
        situacion_max: maxSituacion,
        score,
      };
    });
  
    const historic13 = ultimos13Meses(historic);
  
    if (historic13.length === 0)
      return NextResponse.json({ error: "Sin registros en los últimos 13 meses" }, { status: 404 });
  
    const avgScore =
        historic13.reduce((sum, h) => sum + h.score, 0) / historic13.length;
    const latest = historic13[0];
  
    return NextResponse.json({
      identificacion: deuda.identificacion,
      nombre: deuda.denominacion,
      score_promedio: Math.round(avgScore),
      nivel_riesgo: riskLevel(avgScore),
      deuda_total_actual: latest.deuda_total,
      historico: historic13,
      fuente: "BCRA - Central de Deudores",
    });
  } catch (err) {
    if (err instanceof BcraError)
      return NextResponse.json({ error: err.message }, { status: err.status });
  
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}