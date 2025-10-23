"use client";
import DashboardClient from "@/components/dashboardClient/DashboardClient";
import DashboardOperator from "@/components/dashboardOperator/DashboardOperator";
import Landing from "@/components/landing/Landing";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const supabase = createClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data?.user;
    },
    refetchOnWindowFocus: false,
  });

  if (user === null) {
    return <Landing />;
  }
  if (user && user.user_metadata.role === "operator") {
    return <DashboardOperator />;
  }
  if (user && user.user_metadata.role === "representante") {
    return <DashboardClient />;
  }
}
