// types.ts
export type PrestamoAssigned = {
    id: string;
    monto: number;
    currency: string;
    term_months: number;
    purpose: string;
    status: "PENDIENTE" | "APROBADO" | "RECHAZADO";
    assigned_at: string;
    created_at: string;
    decision_at?: string;
    pyme: {
        id: string;
        company_name: string;
        cuil_cuit: string;
        phone?: string;
        email?: string;
        address?: string;
        annual_billing_estimated: number;
        amount_employees: number;
        merch_years: number;
        support_documents?: SupportDocument[];
    };
    
    sugerencia_ia?: SugerenciaIA[];
};

export type SupportDocument = {
    id: string;
    pyme_id: string;
    file_name: string;
    document_type: string;
    status: "UPLOADED" | "APPROVED" | "REJECTED";
    created_at: string;
    storage_path: string;
};

export type SugerenciaIA = {
    id: string;
    prestamo_id: string;
    risk_level: "bajo" | "medio" | "alto";
    recommendation: "APROBAR" | "RECHAZAR" | "OBSERVAR";
    explanation: string;
};

export type TimelineEvent = {
    date: string; // ISO
    event: string;
    user: string;
  };