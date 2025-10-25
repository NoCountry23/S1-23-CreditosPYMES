"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

async function getSession() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export const useUser = () =>
  useQuery({
    queryKey: ["session"], 
    queryFn: getSession,
    staleTime: 1000 * 60 * 5, // 5 min
  });