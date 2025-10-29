import { z } from "zod";

// Esquema base para crear una Pyme
export const PymeSchema = z.object({
  // --------------------------------------------------------
  // CAMPOS REQUERIDOS CRÍTICOS (z.string() sin .optional/.nullable es requerido)
  // --------------------------------------------------------

  // company_name:
  company_name: z
    .string({
      error: "El nombre de la empresa es obligatorio.",
    })
    .trim()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(255, { message: "El nombre no puede exceder los 255 caracteres." }),

  // cuil_cuit:
  cuil_cuit: z
    .string({
      error: "El CUIL/CUIT es obligatorio.",
    })
    .trim()
    .length(13, { message: "El CUIL/CUIT debe tener 13 caracteres, incluyendo guiones (XX-XXXXXXXX-X)." })
    .regex(/^\d{2}-\d{8}-\d{1}$/, { message: "Formato de CUIL/CUIT inválido. Use el formato XX-XXXXXXXX-X." }),

  // address (character varying)
  address: z.string().trim().min(1, { message: "La dirección no debe estar vacía." }).max(255, { message: "La dirección no puede exceder los 255 caracteres." }),

  // email (character varying) - Control de formato estricto
  email: z.email({ message: "El formato del email es inválido." })
    .trim()
    .max(255, { message: "El email no puede exceder los 255 caracteres." }),

  // industry (character varying)
  industry: z.string().trim().min(1, { message: "El sector no debe estar vacío." }).max(100, { message: "El sector no puede exceder los 100 caracteres." }),
  phone: z.string().trim().min(1, { message: "El teléfono no debe estar vacío." }).max(100, { message: "El teléfono no puede exceder los 100 caracteres." }),

  // annual_billing_estimated (double precision) - Control de valor
  annual_billing_estimated: z
    .number({
      error: "La facturación debe ser un número.",
    })
    .positive({ message: "La facturación debe ser un valor positivo." }),

  // amount_employees (bigint) - Control de número entero y positivo
  amount_employees: z
    .number({
      error: "El número de empleados debe ser un número entero.",
    })
    .int({ message: "El número de empleados debe ser un número entero." })
    .min(1, { message: "Una Pyme debe tener al menos 1 empleado." }),

  // merch_years (bigint) - Control de número entero y rango
  merch_years: z
    .number({
      error: "Los años de antigüedad deben ser un número entero.",
    })
    .int({ message: "Los años de antigüedad deben ser un número entero." })
    .min(0, { message: "Los años de antigüedad no pueden ser negativos." })
    .max(100, { message: "Valor de antigüedad irreal." }), // Regla lógica de negocio

  // Identificador del usuario propietario / creador de la Pyme
  user_id: z.string().trim().min(1, { message: "El ID del usuario no debe estar vacío." }),

  // legal_address (character varying)
  legal_address: z
    .string()
    .trim()
    .min(1, { message: "La dirección legal no debe estar vacía." })
    .max(255),

  // activity_description (character varying)

  // city (character varying)
  city: z
    .string()
    .trim()
    .min(1, { message: "La ciudad no debe estar vacía." })
    .max(100),

  // local_state (character varying)
  local_state: z
    .string()
    .trim()
    .min(1, { message: "El estado local no debe estar vacío." })
    .max(100),

  // postal_code (bigint) - Control de número entero
  postal_code: z
    .number({
      error: "El código postal debe ser un número entero.",
    })
    .int({ message: "El código postal debe ser un número entero." }),

  // activity_description (character varying)
  activity_description: z
    .string()
    .trim()
    .min(1, { message: "La descripción no debe estar vacía." })
    .max(500, { message: "La descripción es demasiado larga." }),

  // url_pyme: z.string().trim().min(1, { message: "La URL de la Pyme no debe estar vacía." }).max(255, { message: "La URL de la Pyme no puede exceder los 255 caracteres." }),
  // --------------------------------------------------------
  // CAMPOS QUE NO SE INSERTAN (Solo para lectura o tipado interno)
  // --------------------------------------------------------
  // id, created_at, updated_at son manejados por Supabase y no deben estar en el body POST
});

// Esquema para la actualización (PUT/PATCH): permite que todos los campos sean opcionales
export const PymeUpdateSchema = PymeSchema.partial();
