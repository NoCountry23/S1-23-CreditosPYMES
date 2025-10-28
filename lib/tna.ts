// lib/tna.ts
export function normalizeTna(raw: unknown): number {
  if (raw === null || raw === undefined) {
    throw new Error("TNA faltante");
  }
  let t = Number(raw);
  if (!Number.isFinite(t)) {
    throw new Error("TNA inválida");
  }
  // Si viene como porcentaje (45, 60, 12), pásalo a decimal
  if (t > 1) t = t / 100;

  // Rango razonable: (0, 2) → hasta 200% anual
  if (!(t > 0 && t < 2)) {
    throw new Error("TNA fuera de rango. Usa 0.45 para 45% o 45 como porcentaje.");
  }
  return t;
}
