import React from "react";
import { Building2 } from "lucide-react";

const companyData = {
  name: "Comercial López S.R.L.",
  cuit: "30-12345678-9",
  yearsInBusiness: 7,
  employees: 28,
  annualRevenue: 3500000
};

export default function CompanyInfoCard() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-6 mb-8 text-white shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Información de tu Empresa</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-blue-200 dark:text-blue-300 mb-1">CUIT</p>
              <p className="font-medium">{companyData.cuit}</p>
            </div>
            <div>
              <p className="text-blue-200 dark:text-blue-300 mb-1">Antigüedad</p>
              <p className="font-medium">{companyData.yearsInBusiness} años</p>
            </div>
            <div>
              <p className="text-blue-200 dark:text-blue-300 mb-1">Empleados</p>
              <p className="font-medium">{companyData.employees}</p>
            </div>
            <div>
              <p className="text-blue-200 dark:text-blue-300 mb-1">Facturación Anual</p>
              <p className="font-medium">${(companyData.annualRevenue / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
