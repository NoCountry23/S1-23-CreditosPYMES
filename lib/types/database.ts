// Tipos para las tablas de la base de datos
// Estos tipos representan la estructura exacta de tus tablas en Supabase

export interface Pyme {
  id: number;
  created_at: string; // timestamptz se convierte a string en JavaScript
  company_name: string;
  cuil_cuit: string;
  address: string;
  email: string;
  industry: string;
  updated_at: string; // date se convierte a string
}

export interface Prestamo {
  id_prestamo: number;
  created_at: string;
  pyme_id: number; // Foreign key que apunta a pymes.id
  representante_id: number;
  operador_id: number;
  monto: number; // numeric se convierte a number
  currency: string;
  term_months: number; // int2 se convierte a number
  cant_cuotas: number; // int2 se convierte a number
  purpose: string;
  status: string;
  submitted_at: string | null; // date puede ser null
  decision_at: string | null; // date puede ser null
  rejection_reason: string | null; // text puede ser null
}

// Tipo para cuando haces JOIN entre prestamo y pyme
export interface PrestamoWithPyme extends Prestamo {
  pyme: Pyme;
}

// Tipos para las respuestas de la API
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Tipos para los parámetros de entrada
export interface GenerateContractRequest {
  prestamo_id: number;
}
