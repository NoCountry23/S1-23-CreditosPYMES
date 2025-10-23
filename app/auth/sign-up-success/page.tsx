import { Mail, CheckCircle } from "lucide-react";

const EmailVerification = () => {
  return (
    <div className="min-h-screen dark:bg-base-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className=" rounded-2xl shadow-xl p-8 border border-gray-500/50 dark:bg-base-300">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-12 h-12 text-blue-600" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center  mb-3">
            ¡Registro Exitoso!
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Verifica tu correo electrónico para activar tu cuenta
          </p>

          {/* Instructions */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <p className="text-sm text-gray-500">
                Revisa tu bandeja de entrada y busca el email de FinanciaPYME
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <p className="text-sm text-gray-500">
                Haz clic en el enlace de verificación dentro del correo
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <p className="text-sm text-gray-500">
                Una vez verificado, podrás acceder a tu cuenta
              </p>
            </div>
          </div>

          {/* Alert */}
          <div className="dark:bg-yellow-500/20 bg-yellow-50 border dark:border-yellow-200 border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-sm dark:text-yellow-200 text-yellow-800">
              <strong>Nota:</strong> Si no encuentras el email, revisa tu
              carpeta de spam o correo no deseado.
            </p>
          </div>
        </div>

        {/* Footer Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            ¿Problemas para verificar tu cuenta?{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Contáctanos
            </a>
          </p>
        </div>

        {/* Email Provider Quick Links */}
        <div className="mt-6 dark:bg-base-300 rounded-xl shadow-md border border-gray-500/50  p-4">
          <p className="text-sm text-gray-500 text-center mb-3">
            Acceso rápido a tu email:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://gmail.com"
              rel="noopener noreferrer"
              className="px-4 py-2 dark:bg-base-100 hover:bg-gray-500/40 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              Gmail
            </a>
            <a
              href="https://outlook.com"
              rel="noopener noreferrer"
              className="px-4 py-2 dark:bg-base-100 hover:bg-gray-500/40 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              Outlook
            </a>
            <a
              href="https://yahoo.com"
              rel="noopener noreferrer"
              className="px-4 py-2 dark:bg-base-100 hover:bg-gray-500/40 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              Yahoo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
