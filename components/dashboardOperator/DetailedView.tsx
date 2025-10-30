import {
  Clock,
  XCircle,
  Building2,
  TrendingUp,
  DollarSign,
  FileText,
  CheckCircle,
  Eye,
  Download,
  // MessageSquare,
} from "lucide-react";
import { useState } from "react";
import type { PrestamoAssigned, TimelineEvent } from "@/app/types/types";
// import { useDecidePrestamo } from "@/hooks/useDecidePrestamo";
import { useConfirmPrestamo } from "@/hooks/useConfirmPrestamo";
import { useRejectPrestamo } from "@/hooks/useRejectPrestamo";
import { toast } from "react-toastify";
import RiskAnalysis from "@/components/dashboardOperator/RiskAnalysis";

type Props = {
  prestamo: PrestamoAssigned;
  onClose: () => void;
};

export default function DetailedView({ prestamo, onClose }: Props) {
  // const { mutate } = useDecidePrestamo();
  const { mutate: reject } = useRejectPrestamo();
  const sugerencia = prestamo.sugerencia_ia?.[0] ?? null;
  const docs = prestamo.pyme.support_documents ?? [];
  const { mutate: confirm } = useConfirmPrestamo();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReject, setShowReject] = useState(false);

  // const handleConfirm = () => {
  //   if (window.confirm("¿Confirmar el préstamo y generar el cronograma de cuotas?")) {
  //     confirm(prestamo.id, { onSuccess: () => onClose() });
  //   }
  // };
  const handleConfirm = () => setShowConfirm(true);

  const handleReject = () => setShowReject(true);

  // const handleReject = () => {
  //   const reason = window.prompt("Motivo del rechazo:");
  //   if (reason) {
  //     mutate({ id: prestamo.id, decision: "REJECT", reason }, { onSuccess: () => onClose() });
  //   }
  // };

  // dentro de DetailedView
  const buildTimeline = (p: PrestamoAssigned) => {
    const base: TimelineEvent[] = [
      {
        date: p.created_at,
        event: "Prestamo solicitado",
        user: "Representente",
      },
      {
        date: p.assigned_at ?? p.created_at,
        event: "Asignado para evaluación",
        user: "Operador",
      },
    ];

    if (p.decision_at) {
      base.push({
        date: p.decision_at,
        event: p.status.toUpperCase() === "APROBADO" ? "Solicitud aprobada" : "Solicitud rechazada",
        user: "Operador",
      });
    }
    else {
      base.push({
        date: new Date().toISOString(),
        event: "Pendiente de decisión",
        user: "Operador",
      });
    }

    return base;
  };

  const timeline = buildTimeline(prestamo); //luego lo tomamos de un compoente aparte
  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-background  rounded-xl shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-b-gray-500  flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-xl">
            <div>
              <h2 className="text-xl font-bold">Revisión de Solicitud</h2>
              <p className="text-blue-100 mt-1 text-sm">{prestamo.id}</p>
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
                Riesgo: {sugerencia.riskLevel}
              </div>
            </div> */}
            {/* Risk / Sugerencia IA */}
            {sugerencia && (
              <div className={`
  rounded-lg border-2 p-4
  ${sugerencia.risk_level === "alto"
                ? "border-red-500 dark:border-red-400"
                : sugerencia.risk_level === "medio"
                  ? "border-yellow-500 dark:border-yellow-400"
                  : "border-green-600 dark:border-green-400"}
`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">Sugerencia IA</span>

                  <span className={`
      text-xs font-semibold uppercase tracking-wide
      px-2 py-0.5 rounded-full border bg-transparent
      ${sugerencia.risk_level === "alto"
                ? "text-red-600 border-red-600 dark:text-red-400 dark:border-red-400"
                : sugerencia.risk_level === "medio"
                  ? "text-yellow-600 border-yellow-600 dark:text-yellow-400 dark:border-yellow-400"
                  : "text-green-700 border-green-700 dark:text-green-400 dark:border-green-400"}
    `}>
                    Riesgo {sugerencia.risk_level}
                  </span>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {sugerencia.explanation}
                </p>
              </div>

            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Company Info */}
                <div className=" border border-gray-500/50 bg-transparent rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Información de la Empresa
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-500">Razón Social</p>
                      <p className="font-medium">
                        {prestamo.pyme.company_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-500">Nombre Comercial</p>
                      <p className="font-medium">
                        {prestamo.pyme.company_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-500">CUIT</p>
                      <p className="font-medium">{prestamo.pyme.cuil_cuit}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-500">Teléfono</p>
                      <p className="font-medium">{prestamo.pyme.phone ?? "-"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600 dark:text-gray-500">Dirección</p>
                      <p className="font-medium">
                        {prestamo.pyme.address ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-500">Email</p>
                      <p className="font-medium text-blue-600">
                        {prestamo.pyme.email ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-500">Website</p>
                      <p className="font-medium text-blue-600">
                        {prestamo.pyme.url_pyme ?? "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Financial Data */}
                <div className=" border border-gray-500/50 bg-transparent rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Datos Financieros
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className=" p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-500">Facturación Anual</p>
                      <p className="text-xl md:text-2xl font-bold text-green-700">
                        ${prestamo.pyme.annual_billing_estimated.toLocaleString()}
                      </p>
                    </div>
                    <div className=" p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Facturación Mensual
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-blue-700">
                      ${(prestamo.pyme.annual_billing_estimated / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className=" p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-500">Empleados</p>
                      <p className="text-2xl font-bold text-purple-700">
                        {prestamo.pyme.amount_employees}
                      </p>
                    </div>
                    <div className=" p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-500">
                        Años de Antigüedad
                      </p>
                      <p className="text-2xl font-bold text-orange-700">
                        {prestamo.pyme.merch_years}
                      </p>
                    </div>
                    <div>
                      {/* <p className="text-sm text-gray-600 dark:text-gray-500">Score Crediticio</p> */}
                      
                    </div>
                    <div>
                      {/* <p className="text-sm text-gray-600 dark:text-gray-500">Estado AFIP</p> */}
                      {/* <p className="font-medium text-green-600 mt-1"> */}
                      {/* ✓ {details.financialData.taxStatus} */}
                      {/* </p> */}
                    </div>
                  </div>
                </div>

                {/* Loan Details */}
                <div className=" border border-gray-500/50 bg-transparent rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Detalles del Préstamo
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-500">
                          Monto Solicitado
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-blue-600">
                          ${prestamo.monto.toLocaleString()} {prestamo.currency}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-500">Plazo</p>
                        <p className="text-xl md:text-2xl font-bold">
                          {prestamo.term_months} meses
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-500">
                          Cuota Mensual Estimada
                        </p>
                        <p className="text-xl font-bold">
                          -
                          {/* ${details.loanDetails.monthlyPayment.toLocaleString()} */}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-500">Tasa de Interés</p>
                        <p className="text-xl font-bold">
                          {prestamo.interes * 100}% TNA
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1 dark:text-gray-500">Destino</p>
                      <p className="font-medium">
                        {prestamo.purpose}
                      </p>
                    </div>
                    {/* <div>
                      <p className="text-sm text-gray-600 mb-1 dark:text-gray-500">
                        Descripción del Proyecto
                      </p>
                      <p className="text-sm     p-3 rounded">
                        {details.loanDetails.description}
                      </p>
                    </div> */}
                  </div>
                </div>

                {/* Documents */}
                <div className="border border-gray-500/50 bg-transparent rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Documentación
                  </h3>

                  {docs.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Aún no se han cargado documentos.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {docs.map((doc) => {
                        // Si el path no es una URL absoluta, construir la URL pública de Supabase
                        const url = doc.storage_path.startsWith("http")
                          ? doc.storage_path
                          : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/support-documents/${doc.storage_path}`;

                        return (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-transparent border border-gray-500/50 "
                          >
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <div>
                                <p className="font-medium text-sm">{doc.file_name}</p>
                                <p className="text-xs text-gray-500">
                                  Subido el {doc.document_type} ·{" "}
                                  {new Date(doc.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => window.open(url, "_blank")}
                                className="p-2 hover:bg-slate-200 dark:hover:bg-gray-900 rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4 text-gray-600" />
                              </button>
                              <button
                                onClick={() => window.open(url, "_blank")}
                                className="p-2 hover:bg-slate-200 dark:hover:bg-gray-900 rounded-lg transition-colors"
                              >
                                <Download className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Actions */}
                <div className=" border border-gray-500/50 bg-transparent rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Acciones</h3>
                  {/* {prestamo.status === "PENDIENTE" && ( */}
                  <div className="space-y-3">
                    <button
                      onClick={handleConfirm}
                      disabled={prestamo.status.toUpperCase() !== "PENDIENTE"}
                      className={`w-full px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors
                        ${prestamo.status.toUpperCase() === "PENDIENTE"
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}>
                      <CheckCircle className="w-5 h-5" />
                      Aprobar Solicitud
                    </button>

                    <button
                      onClick={handleReject}
                      disabled={prestamo.status.toUpperCase() !== "PENDIENTE"}
                      className={`w-full px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors
 ${prestamo.status.toUpperCase() === "PENDIENTE"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}>
                      <XCircle className="w-5 h-5" />
                      Rechazar Solicitud
                    </button>

                    {/* <button
                      disabled={prestamo.status.toUpperCase() !== "PENDIENTE"}
                      className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium">
                      <MessageSquare className="w-5 h-5" />
                      Solicitar Info Adicional
                    </button> */}
                  </div>
                  {/* )} */}
                </div>

                {/* Risk Metrics */}
                <div className=" border border-gray-500/50 bg-transparent rounded-lg p-6">
                  {/* <h3 className="text-lg font-semibold mb-4">
                    Análisis de Riesgo
                  </h3> */}
                  <RiskAnalysis cuit={prestamo.pyme.cuil_cuit} ingresoMensual={(prestamo.pyme.merch_years) / 12} />
                </div>

                {/* Timeline */}
                <div className="border border-gray-500/50 bg-transparent rounded-box p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Línea de Tiempo
                  </h3>

                  {timeline.length === 0 && (
                    <p className="text-sm text-base-content/60">Sin eventos registrados.</p>
                  )}

                  {timeline.length > 0 && (
                    <ul className="timeline timeline-vertical">
                      {timeline.map((item, index) => {
                        const isLast = index === timeline.length - 1;
                        const isPending = item.event.includes("Pendiente de decisión");
                        const colorClass = isPending ? "text-gray-600" : "text-green-500";
                        const hrClass = isPending ? "bg-gray-500" : "bg-green-500";
                        const alignmentClass = index % 2 === 0 ? "timeline-start" : "timeline-end";

                        return (
                          <li key={index}>
                            {index > 0 && <hr className={hrClass} />}

                            <div className={`${alignmentClass} timeline-box bg-transparent border-gray-500/50 `} >
                              <p className="font-semibold text-[11px]">{item.event}</p>
                              <p className="text-[9px] opacity-70">
                                {item.date
                                  ? new Date(item.date).toLocaleString("es-AR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                  })
                                  : ""}
                              </p>
                            </div>

                            <div className="timeline-middle">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className={`${colorClass} h-5 w-5`}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>

                            {!isLast && <hr className={hrClass} />}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                {/* MODAL CONFIRM */}
                {showConfirm && (
                  <div className="modal modal-open">
                    <div className="modal-box bg-white dark:bg-gray-800">
                      <h3 className="font-bold text-lg">Confirmar préstamo</h3>
                      <p className="py-4">
                        ¿Generar el cronograma de cuotas para este préstamo aprobado?
                      </p>
                      <div className="modal-action">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setShowConfirm(false);
                            confirm(prestamo.id, {
                              onSuccess: () => {
                                toast.success("Préstamo confirmado y cuotas generadas");
                                onClose();
                              },
                              onError: (err: Error
                              ) => toast.error(err.message ?? "Error al confirmar"),
                            });
                          }}
                        >
                          Sí, confirmar
                        </button>
                        <button className="btn btn-ghost" onClick={() => setShowConfirm(false)}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODAL REJECT */}
                {showReject && (
                  <div className="modal modal-open">
                    <div className="modal-box bg-white dark:bg-gray-800">
                      <h3 className="font-bold text-lg">Rechazar préstamo</h3>

                      <label className="label">
                        <span className="label-text mb-4">Motivo del rechazo</span>
                      </label>
                      <textarea
                        id="rejectReason"
                        className="textarea textarea-neutral w-full bg-white  dark:bg-gray-700 "
                        rows={4}
                        defaultValue={
                          sugerencia?.explanation ??
                          "No cumple con los requisitos mínimos de evaluación. "
                        }
                      />

                      <div className="modal-action">
                        <button
                          className="btn btn-error"
                          onClick={() => {
                            const reason = (
                              document.getElementById("rejectReason") as HTMLTextAreaElement
                            ).value.trim();
                            if (!reason) {
                              toast.warn("Por favor ingrese un motivo");
                              return;
                            }
                            setShowReject(false);
                            reject(
                              { id: prestamo.id, reason },
                              { onSuccess: () => onClose() }
                            );
                          }}
                        >
                          Sí, rechazar
                        </button>
                        <button className="btn btn-ghost" onClick={() => setShowReject(false)}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
