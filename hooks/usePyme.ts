"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "./useUser"; 

async function fetchPyme() {
  const res = await fetch("/api/pyme/me");
  if (!res.ok) throw new Error("Error obteniendo pyme");
  return res.json();
}

export type Pyme = Awaited<ReturnType<typeof fetchPyme>>

export const usePyme = () => {
  const { data: user, isLoading: loadingUser } = useUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ["pyme", user?.id],
    queryFn: fetchPyme,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  return { pyme: data, loading: loadingUser || isLoading, error };
};