import Link from "next/link";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div className="     flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16  from-blue-600 to-blue-700 rounded-2xl mb-4">
            <span className="text-3xl font-bold ">F</span>
          </div>
          <h1 className="text-3xl font-bold ">FinanciaPYME</h1>
          <p className="text-gray-600 mt-2">Ingresa a tu cuenta</p>
        </div>

        {/* Login Card */}
        <div className="flex flex-col rounded-2xl shadow-xl p-8 border border-gray-500">
          <LoginForm />

          {/* Divider */}
          <div className=" my-6">
            <div className=" flex justify-center text-sm">
              <span className="px-2  text-gray-500">¿No tienes cuenta?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            href="/auth/sign-up"
            className="w-full text-center  text-blue-400 py-3 rounded-lg font-semibold border-2 border-blue-400 hover:bg-blue-500/20 transition-all"
          >
            Registrar mi PYME
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Al iniciar sesión aceptas nuestros{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Términos y Condiciones
          </a>
        </p>
      </div>
    </div>
  );
}
