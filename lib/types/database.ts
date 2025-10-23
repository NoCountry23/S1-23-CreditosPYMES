// =========================
// PyME
// =========================
export interface Pyme {
  id: string;
  company_name: string;
  cuil_cuit: string;
  address?: string;
  email?: string;
  industry?: string;
  created_at: string;   // ISO date string
  updated_at: string;
  annual_billing_estimated?: number;
  amount_employees?: number;
  merch_years?: number;
  legal_address?: string;
  city?: string;
  local_state?: string;
  postal_code?: number;
  activity_description?: string;
  phone: string;
  user_id: string;
}

// =========================
// Préstamos
// =========================
export interface Prestamo {
  id: string;
  pyme_id: string;
  monto: number;
  currency?: string; // default 'ARS'
  term_months: number;
  cant_cuo: number;
  purpose?: string;
  status?: string; // default 'pendiente'
  submitted_at: string;
  decision_at?: string;
  rejection_reason?: string;
  operator_id?: string;
  representante_id: string;
  created_at: string;
  updated_at: string;
}

// =========================
// Documentos de contrato
// =========================
export interface ContractDocument {
  id: string;
  pyme_id?: string;
  prestamo_id?: string;
  docusign_submission_id?: string;
  document_name: string;
  status?: string; // default 'draft'
  signer_email?: string;
  document_url?: string;
  sent_at?: string;
  completed_at?: string;
  expires_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// =========================
// Documentos de soporte
// =========================
export interface SupportDocument {
  id: string;
  pyme_id: string;
  prestamo_id?: string;
  uploaded_by: string;
  file_name: string;
  storage_path: string;
  file_size?: number;
  file_type?: string;
  document_type: string;
  status?: string; // default 'verified'
  verification_notes?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

// =========================
// Cuotas
// =========================
export interface Quota {
  id: string;
  prestamo_id: string;
  numero_cuota: number;
  fecha_vencimiento: string; // date
  amount: number;
  status?: string; // default 'pending'
  paid_at?: string;
  paid_amount?: number;
  created_at: string;
  updated_at: string;
}

// =========================
// Historial de pagos
// =========================
export interface PaymentHistory {
  id: string;
  pyme_id: string;
  prestamo_id: string;
  amount: number;
  payment_date: string; // date
  payment_method: string;
  reference?: string;
  registered_by: string;
  created_at: string;
  updated_at: string;
}

// =========================
// Sugerencias IA
// =========================
export interface SugerenciaIA {
  id: number;
  created_at: string;
  nivel_riesgo?: string;
  aplicatiom?: string; // ojo: en SQL está escrito "aplicatiom"
  state?: string;
}
