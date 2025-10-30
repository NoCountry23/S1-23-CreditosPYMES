import ProgressBar from "@/components/dashboardClient/LoanCard/ProgressBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDocusignApi } from "@/hooks/useDocusignApi";
import { FileText, Download } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DownloadContract({ env_docusign_id, loanId }: { env_docusign_id: string, loanId: string }) {
  const {GetStatus} = useDocusignApi();
  const {docusignStatus} = GetStatus(env_docusign_id);

  return (
    <>
      { env_docusign_id && docusignStatus?.status === "sent" &&  (
        <div className=' my-4 text-sm text-yellow-800 dark:text-yellow-400 space-y-2 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 p-6 rounded-r-lg'>
          <p className='font-semibold'>Contrato pendiente</p>
          <p>Hemos enviado el contrato a tu correo, por favor revisalo </p>
        </div>
      )}
      {
        env_docusign_id && docusignStatus?.status === "completed" &&  (
          <>

            <ProgressBar loanId={loanId} />
            <Card className='mb-4'>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                      Descarga del Contrato firmado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href={`https://docusign-api-omega.vercel.app/signature/documents/${env_docusign_id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:bg-gray-500/20 w-fit p-2 rounded-lg flex gap-2">Descargar
                  <Download className="h-5 w-5" />
                </Link>
              </CardContent>
            </Card>
          </>
        )
      }</>
  );
}
