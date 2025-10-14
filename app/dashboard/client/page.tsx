import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ClientDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si no hay usuario autenticado
  if (!user) {
    redirect("/auth/login");
  }

  const role = user.user_metadata?.role || "unknown";

  // Redirigimos si no es client
  if (role !== "client") {
    redirect("/unauthorized");
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Bienvenido, {user.email}
      </h2>
      <p>
        Rol:{" "}
        <span className="font-semibold text-gray-700">
          {role}
        </span>
      </p>

      <p className="mt-4 text-gray-600">
        Este es tu panel de cliente. Aquí podrás ver tus préstamos y estado
        financiero (cuando los datos estén disponibles).
      </p>
    </div>
  );
}
