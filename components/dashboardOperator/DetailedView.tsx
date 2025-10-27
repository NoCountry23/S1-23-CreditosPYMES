import {
  XCircle,
  Building2,
  TrendingUp,
  DollarSign,
  FileText,
  CheckCircle,
  Eye,
  Download,
  MessageSquare,
} from "lucide-react";
import type { PrestamoAssigned } from "@/app/types/types";
import { useDecidePrestamo } from "@/hooks/useDecidePrestamo";

// Información detallada del pedido seleccionado
// const detailedRequestInfo = {
//   companyInfo: {
//     legalName: "Logística Express S.R.L.",
//     tradeName: "Express 24/7",
//     cuit: "30-71234572-3",
//     address: "Av. Libertador 5432, CABA",
//     phone: "+54 11 4567-8900",
//     email: "admin@expresss247.com.ar",
//     website: "www.express247.com.ar",
//   },
//   financialData: {
//     annualRevenue: 3500000,
//     monthlyRevenue: 291667,
//     employees: 28,
//     yearsInBusiness: 7,
//     bankAccount: "Banco Nación - Cta. Cte.",
//     taxStatus: "Al día",
//     creditScore: 750,
//   },
//   loanDetails: {
//     amount: 950000,
//     term: 36,
//     purpose: "Adquisición de 3 vehículos de carga",
//     description:
//       "La empresa necesita expandir su flota para abarcar nuevos contratos con clientes corporativos. Cuenta con contratos firmados que garantizan el incremento de ingresos.",
//     monthlyPayment: 42500,
//     interestRate: 45,
//   },
//   documents: [
//     {
//       name: "DNI Representante Legal",
//       status: "approved",
//       uploadDate: "2025-10-10",
//     },
//     {
//       name: "Constancia AFIP",
//       status: "approved",
//       uploadDate: "2025-10-10",
//     },
//     {
//       name: "Estados Contables (3 años)",
//       status: "approved",
//       uploadDate: "2025-10-10",
//     },
//     {
//       name: "Resúmenes Bancarios (6 meses)",
//       status: "approved",
//       uploadDate: "2025-10-10",
//     },
//     {
//       name: "Contratos con Clientes",
//       status: "approved",
//       uploadDate: "2025-10-10",
//     },
//     {
//       name: "Cotización Vehículos",
//       status: "approved",
//       uploadDate: "2025-10-10",
//     },
//   ],
//   creditHistory: [
//     {
//       date: "2023-05",
//       type: "Préstamo Personal",
//       amount: 450000,
//       status: "Pagado",
//       bank: "Banco Macro",
//     },
//     {
//       date: "2024-02",
//       type: "Descubierto",
//       amount: 150000,
//       status: "Pagado",
//       bank: "Banco Nación",
//     },
//   ],
//   riskAnalysis: {
//     debtToIncome: 0.35,
//     paymentCapacity: "Alta",
//     collateral: "Vehículos existentes + Contratos",
//     recommendation: "APROBAR",
//     riskLevel: "Bajo",
//     score: 85,
//   },
//   timeline: [
//     {
//       date: "2025-10-10 09:30",
//       event: "Solicitud asignada al operador",
//       user: "Sistema",
//     },
//     {
//       date: "2025-10-10 10:15",
//       event: "Documentación revisada",
//       user: "Op. Juan Pérez",
//     },
//     {
//       date: "2025-10-10 14:20",
//       event: "Análisis crediticio completado",
//       user: "Op. Juan Pérez",
//     },
//     {
//       date: "2025-10-11 11:00",
//       event: "Verificación telefónica realizada",
//       user: "Op. Juan Pérez",
//     },
//   ],
// };

type Props = {
  prestamo: PrestamoAssigned;
  onClose: () => void;
};

export default function DetailedView({ prestamo, onClose }: Props) {
  const { mutate } = useDecidePrestamo();
  const sugerencia = prestamo.sugerencia_ia?.[0] ?? null;
  const docs = prestamo.pyme.support_documents ?? [];

  const handleApprove = () => {
    if (window.confirm("¿Está seguro de aprobar esta solicitud?")) {
      mutate({ id: prestamo.id, decision: "APPROVE" }, { onSuccess: () => onClose() });
    }
  };

  const handleReject = () => {
    const reason = window.prompt("Motivo del rechazo:");
    if (reason) {
      mutate({ id: prestamo.id, decision: "REJECT", reason }, { onSuccess: () => onClose() });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-background  rounded-xl shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-b-gray-500  flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-xl">
            <div>
              <h2 className="text-2xl font-bold">Revisión de Solicitud</h2>
              <p className="text-blue-100 mt-1">{prestamo.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Risk Analysis Alert */}
            {/* <div
              className="p-4 rounded-lg border border-gray-500/50 dark:bg-base-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-lg">
                      Recomendación: {details.riskAnalysis.recommendation}
                    </p>
                    <p className="text-sm opacity-75">
                      Capacidad de pago: {details.riskAnalysis.paymentCapacity}
                    </p>
                  </div>
                </div>
                Riesgo: {details.riskAnalysis.riskLevel}
              </div>
            </div> */}
            {/* Risk / Sugerencia IA */}
            {sugerencia && (
              <div
                className={`p-4 rounded-lg border ${sugerencia.risk_level === "alto"
                  ? "border-red-300 bg-red-50 text-red-800"
                  : sugerencia.risk_level === "medio"
                    ? "border-yellow-300 bg-yellow-50 text-yellow-800"
                    : "border-green-300 bg-green-50 text-green-800" }`}>
                <p className="font-semibold">Sugerencia IA: {sugerencia.recommendation}</p>
                <p className="text-sm mt-1">{sugerencia.explanation}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Company Info */}
                <div className=" border border-gray-500/50 dark:bg-base-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Información de la Empresa
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Razón Social</p>
                      <p className="font-medium">
                        {prestamo.pyme.company_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Nombre Comercial</p>
                      <p className="font-medium">
                        {prestamo.pyme.company_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">CUIT</p>
                      <p className="font-medium">{prestamo.pyme.cuil_cuit}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Teléfono</p>
                      <p className="font-medium">{prestamo.pyme.phone ?? "-"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">Dirección</p>
                      <p className="font-medium">
                        {prestamo.pyme.address ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium text-blue-600">
                        {prestamo.pyme.email ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Website</p>
                      <p className="font-medium text-blue-600">
                        {/* {details.companyInfo.website} */}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Financial Data */}
                <div className=" border border-gray-500/50 dark:bg-base-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Datos Financieros
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className=" p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Facturación Anual</p>
                      <p className="text-2xl font-bold text-green-700">
                        ${prestamo.pyme.annual_billing_estimated.toLocaleString()}
                      </p>
                    </div>
                    <div className=" p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Facturación Mensual
                      </p>
                      <p className="text-2xl font-bold text-blue-700">
                        {/* ${details.financialData.monthlyRevenue.toLocaleString()} */}
                      </p>
                    </div>
                    <div className=" p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Empleados</p>
                      <p className="text-2xl font-bold text-purple-700">
                        {prestamo.pyme.amount_employees}
                      </p>
                    </div>
                    <div className=" p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Años de Antigüedad
                      </p>
                      <p className="text-2xl font-bold text-orange-700">
                        {prestamo.pyme.merch_years}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Score Crediticio</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1  rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                          // style={{
                          //   width: `${(details.financialData.creditScore / 900) * 100 }%`,
                          // }}
                          >

                          </div>
                        </div>
                        <span className="font-bold text-lg">
                          {/* {details.financialData.creditScore} */}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estado AFIP</p>
                      <p className="font-medium text-green-600 mt-1">
                        {/* ✓ {details.financialData.taxStatus} */}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Loan Details */}
                <div className=" border border-gray-500/50 dark:bg-base-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Detalles del Préstamo
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          Monto Solicitado
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          ${prestamo.monto.toLocaleString()} {prestamo.currency}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Plazo</p>
                        <p className="text-2xl font-bold">
                          {prestamo.term_months} meses
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Cuota Mensual Estimada
                        </p>
                        <p className="text-xl font-bold">
                          {/* ${details.loanDetails.monthlyPayment.toLocaleString()} */}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tasa de Interés</p>
                        <p className="text-xl font-bold">
                          {/* {details.loanDetails.interestRate}% TNA */}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Destino</p>
                      <p className="font-medium">
                        {prestamo.purpose}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Descripción del Proyecto
                      </p>
                      <p className="text-sm     p-3 rounded">
                        {/* {details.loanDetails.description} */}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className=" border border-gray-500/50 dark:bg-base-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Documentación
                  </h3>
                  {docs.length === 0 ? (
                    <p className="text-sm text-gray-500">Aún no se han cargado documentos.</p>
                  ) : (
                    <div className="space-y-2">
                      {docs.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3  rounded-lg bg-background"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="font-medium text-sm">{doc.file_name}</p>
                              <p className="text-xs text-gray-500">
                                Subido el {doc.document_type} · {new Date(doc.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                              <Download className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Actions */}
                <div className=" border border-gray-500/50 dark:bg-base-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Acciones</h3>
                  {prestamo.status === "PENDIENTE" && (
                    <div className="space-y-3">
                      <button
                        onClick={handleApprove}
                        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Aprobar Solicitud
                      </button>
                      <button
                        onClick={() => handleReject}
                        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-medium"
                      >
                        <XCircle className="w-5 h-5" />
                        Rechazar Solicitud
                      </button>
                      <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium">
                        <MessageSquare className="w-5 h-5" />
                        Solicitar Info Adicional
                      </button>
                    </div>
                  )}
                </div>

                {/* Risk Metrics */}
                <div className=" border border-gray-500/50 dark:bg-base-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Análisis de Riesgo
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Ratio Deuda/Ingreso
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                          {/* <div
                          className={`h-2 rounded-full ${details.riskAnalysis.debtToIncome < 0.4
                            ? "bg-green-600"
                            : "bg-yellow-600"
                            }`}
                          style={{
                            width: `${details.riskAnalysis.debtToIncome * 100
                              }%`,
                          }}
                        ></div> */}
                        </div>
                        <span className="font-bold">
                          {/* {(details.riskAnalysis.debtToIncome * 100).toFixed(0)} */}
                          %
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Capacidad de Pago</p>
                      <p className="font-bold text-green-600">
                        {/* {details.riskAnalysis.paymentCapacity} */}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Garantías</p>
                      <p className="font-medium text-sm">
                        {/* {details.riskAnalysis.collateral} */}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className=" border border-gray-500/50 dark:bg-base-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Línea de Tiempo
                  </h3>
                  {/* <div className="space-y-4">
                  {details.timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        {idx < details.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-300 my-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium">{item.event}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                        <p className="text-xs text-gray-600">{item.user}</p>
                      </div>
                    </div>
                  ))}
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
