// schemas/IdSchema.ts
import { z } from "zod";

/**
 * Esquema universal para validar identificadores UUID.
 * Se utiliza para IDs primarios, claves foráneas y parámetros de ruta.
 */
export const IdSchema = z.string().uuid({
  message: "El ID debe ser un identificador único universal (UUID) válido.",
});
