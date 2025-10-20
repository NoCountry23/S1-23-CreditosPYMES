// schemas/PrestamoSchema.ts
import { z } from 'zod';
import { IdSchema } from './IdSchema'; 

// Lista de monedas permitidas (Regla de Negocio)
export const CurrencyEnum = z.enum(['ARS', 'USD', ] as const, {
  error: "Moneda inválida. Debe ser ARS o USD."
});

// Lista de estados permitidos (Regla de Negocio y Seguridad)
export const StatusEnum = z.enum(['PENDIENTE', 'APROBADO', 'RECHAZADO', 'CANCELADO', 'PAGADO'] as const, {
  error: "Estado de préstamo inválido."
});


export const PrestamoSchema = z.object({
  
  // --------------------------------------------------------
  // CLAVES FORÁNEAS Y REQUERIDOS CRÍTICOS
  // --------------------------------------------------------

  // pyme_id (uuid) - Clave foránea (REQUERIDO para la creación)
  pyme_id: IdSchema.refine(id => id.length > 0, { message: "El ID de la Pyme es obligatorio." }),

  // monto (numeric -> number) - Debe ser positivo y con precisión decimal
  monto: z.number({
    error: "El monto del préstamo es obligatorio."
  })
    .positive({ message: "El monto debe ser un valor positivo." })
    .max(10000000, { message: "El monto excede el límite máximo de préstamo." }).nullable(), // Regla de negocio

  // currency (varchar) - Debe ser una moneda permitida
  currency: CurrencyEnum.default('ARS'), // Asignamos un default si no se provee (configurable)

  // term_months (int4 -> number) - Número entero positivo
  term_months: z.number({
    error: "El plazo en meses es obligatorio."
  })
    .int({ message: "El plazo debe ser un número entero." })
    .min(1, { message: "El plazo mínimo es de 1 mes." })
    .max(60, { message: "El plazo máximo es de 60 meses." }).nullable(),

  // cant_cuo (int4 -> number) - Número de cuotas (debe ser consistente con term_months)
  cant_cuo: z.number({
    error: "La cantidad de cuotas es obligatoria."
  })
    .int()
    .min(1),
    
  // purpose (text) - Descripción del propósito del préstamo
  purpose: z.string().trim().min(10, { message: "El propósito debe ser descriptivo." }).max(1000).optional().nullable(),
    
  // status (varchar) - Estado inicial del préstamo
  status: StatusEnum.default('PENDIENTE'), // Siempre comienza como PENDIENTE al crearse

  // --------------------------------------------------------
  // CAMPOS OPCIONALES Y DE SÓLO LECTURA (Manejo de Fechas y IDs)
  // --------------------------------------------------------

  // decision_at (timestamptz) - Fecha de decisión, opcional en la creación
  decision_at: z.coerce.date().optional().nullable(),
  
  // rejection_reason (text) - Solo necesario si es RECHAZADO
  rejection_reason: z.string().trim().max(500).optional().nullable(),
  
  // operator_id (uuid) - Opcional, solo lo completa el sistema o el operador
  operator_id: IdSchema.optional().nullable(),
  
  // representante_id (uuid) - Opcional
  representante_id: IdSchema.optional().nullable(),

  // id (uuid), submitted_at (timestamptz) -> Ignorados en POST, manejados por DB
});


// Esquema para la actualización (PATCH): todos los campos son opcionales
export const PrestamoUpdateSchema = PrestamoSchema.partial();