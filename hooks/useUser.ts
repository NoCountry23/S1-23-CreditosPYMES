"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

async function getSession() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;

  // ➜  Unificamos metadata con las props principales
  const u = data.user;
  return {
    id: u.id,
    email: u.email,
    nombre: u.user_metadata.nombre ?? "",
    apellido: u.user_metadata.apellido ?? "",
    role: u.user_metadata.role ?? "representante",
    created_at: u.created_at,
  };
};

export const useUser = () =>
  useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });