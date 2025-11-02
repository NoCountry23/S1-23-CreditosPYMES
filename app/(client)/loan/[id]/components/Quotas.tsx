import { Button } from "@/components/ui/button";
import useFormatAmount from "@/hooks/useFormatAmount";
import { Quota } from "@/lib/types/database";
import { es } from "date-fns/locale";
import React from "react";
import { format } from "date-fns";
import PayButton from "@/components/PayButton";

export default function Quotas({ quotas }: { quotas: Quota[] }) {
  const formatAmount = useFormatAmount;
  const [initialItem, setInitialItem] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const handlePreviousPage = () => {
    setInitialItem(initialItem - 10);
    setPage(page - 1);
  };
  const handleNextPage = () => {
    setInitialItem(initialItem + 10);
    setPage(page + 1);
  };
  return (
    <div className="overflow-x-auto space-y-5">
      <table className="w-full max-w-3xl m-auto">
        <thead>
          <tr className="border-b">
            <th className="text-center py-3 px-4 font-medium text-gray-500">Cuota</th>
            <th className="text-center py-3 px-4 font-medium text-gray-500">Vencimiento</th>
            <th className="text-center py-3 px-4 font-medium text-gray-500">Monto</th>
            <th className="text-center py-3 px-4 font-medium text-gray-500">Estado</th>
            <th className="text-center py-3 px-4 font-medium text-gray-500">Fecha de Pago</th>
          </tr>
        </thead>
        <tbody>
          {quotas.slice(initialItem, initialItem + 10).map((quota) => {
            return (
              <tr key={quota.id} className="border-b hover:bg-gray-500/20">
                <td className="py-3 px-4 font-medium text-center">#{quota.numero_cuota}</td>
                <td className="py-3 px-4 text-center">
                  {format(new Date(quota.fecha_vencimiento), "dd/MM/yyyy", { locale: es })}
                </td>
                <td className="py-3 px-4 text-center">
                  {formatAmount(quota.amount)}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-3 py-1 w-fit h-fit ${quota.status?.toLowerCase() === "pagada" && "bg-green-500" } ${quota.status?.toLowerCase() === "pendiente" && "bg-yellow-500" } ${quota.status?.toLowerCase() === "vencida" && "bg-red-500" }  backdrop-blur-sm rounded-full text-sm font-medium`}>
                    {quota.status?.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
          
                  {quota.paid_at ? format(new Date(quota.paid_at), "dd/MM/yyyy HH:mm", { locale: es }) : "-"}
                </td>
                {
                  !(quota.status === "pagada") &&
                            <td>
                              {/* <Button size="sm" className="w-full bg-red-500">
                                Pagar
                              </Button> */}
                              <PayButton quota={quota} />
                            </td>
                }
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className=' flex justify-between w-full max-w-3xl m-auto'>
        <Button size={"lg"} disabled={page === 1} onClick={handlePreviousPage}>Anterior</Button>
        <p>{page} de {Math.ceil(quotas.length / 10)}</p>
        <Button size={"lg"} disabled={quotas.length < 10 || page === Math.ceil(quotas.length / 10)} onClick={handleNextPage}>Siguiente</Button>
      </div>
    </div>
  );
}
