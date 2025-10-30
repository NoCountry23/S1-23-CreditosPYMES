import { useQuery } from "@tanstack/react-query";

export function useDocusignApi() {
  const GetStatus =  (envelope_id: string | undefined) => {
    const {data: docusignStatus, isLoading, error} =useQuery({
      queryKey: ["loan", envelope_id],
      queryFn: async () => {
        const res = await fetch(`https://docusign-api-omega.vercel.app/signature/status/${envelope_id}` );
        if (!res.ok) throw new Error("Error al cargar el estado de la firma");
        const data = await res.json();
        return data  ;
      },
      enabled: !!envelope_id,
      refetchOnWindowFocus: true
    });
    return {docusignStatus, isLoading, error};
  };

  return {GetStatus};
};
