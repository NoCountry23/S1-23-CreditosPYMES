"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const loanId = searchParams.get("loan");
  const router = useRouter();

  let icon = <CheckCircle className="w-16 h-16 text-green-500" />;
  let title = "Pago exitoso 🎉";
  let message = "Tu pago se registró correctamente.";

  if (status === "failure") {
    icon = <XCircle className="w-16 h-16 text-red-500" />;
    title = "Pago fallido 😞";
    message = "Ocurrió un problema al procesar tu pago.";
  }

  if (status === "pending") {
    icon = <Clock className="w-16 h-16 text-yellow-500" />;
    title = "Pago pendiente ⏳";
    message = "Tu pago está en proceso. Te avisaremos cuando se confirme.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {icon}
      <h1 className="text-2xl font-bold mt-4">{title}</h1>
      <p className="text-gray-600 mt-2">{message}</p>

      {loanId && (
        <button
          onClick={() => router.push(`/loan/${loanId}`)}
          className="btn btn-primary mt-6"
        >
          Volver al préstamo
        </button>
      )}
    </div>
  );
}
