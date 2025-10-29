import { useQuery } from "@tanstack/react-query";

export const usePymesWithPendingLoans = () =>
  useQuery({
    queryKey: ["pymes", "pending-loans"],
    queryFn: () => fetch("/api/pyme/with-pending-loans").then((r) => r.json()),
  });