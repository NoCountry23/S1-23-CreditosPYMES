import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const role = user?.user_metadata?.role || "unknown";

  return (
    <div className="flex flex-col"
    style={{ minHeight: "calc(100vh - 6rem)" }} // Resta del header aprox.
    >
      {/* Navbar */}
      <header className="bg-gray-900 text-white p-4 flex flex-wrap sm:flex-nowrap justify-between items-center">
        <h1 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0">
          Dashboard
        </h1>

        <div className="flex flex-wrap gap-2 sm:gap-4 items-center max-w-full">
          <span
            className="truncate max-w-[150px] sm:max-w-[200px] md:max-w-[250px] text-sm sm:text-base"
            title={user.email}
          >
            {user.email}
          </span>
          <span className="px-3 py-1 bg-blue-700 rounded-md text-xs sm:text-sm">
            {role}
          </span>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  );
}
