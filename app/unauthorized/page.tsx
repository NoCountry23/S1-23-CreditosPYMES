import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center px-4">
      <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Acceso no autorizado
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        No tenés permisos para acceder a esta sección del panel. Si creés que se
        trata de un error, contactá con un administrador.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
