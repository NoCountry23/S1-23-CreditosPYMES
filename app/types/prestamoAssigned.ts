export type PrestamoAssigned = {
    id: string;
    monto: number;
    currency: string;
    term_months: number;
    purpose: string;
    status: "PENDIENTE" | "APROBADO" | "RECHAZADO";
    submitted_at: string;
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
    };
  };