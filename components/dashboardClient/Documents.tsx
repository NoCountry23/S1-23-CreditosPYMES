"use client";
import { usePyme } from "@/hooks/usePyme";
import { SupportDocument } from "@/lib/types/database";
import { useQuery } from "@tanstack/react-query";
import { FileText, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Documents() {
  const {pyme }= usePyme();
  
  const {data: documents, isLoading, error} = useQuery({
    queryKey: ["documents", pyme?.id],
    queryFn: async () => {
      const res = await fetch(`/api/pyme/${pyme?.id}/documents`);
      if (!res.ok) throw new Error("Error al cargar documentos");
      const data = await res.json();
      
      return data as  SupportDocument[];
    },
    enabled: !!pyme?.id
  });  
  if ( error ) {
    return null;
  }
  if (isLoading || !documents) {
    return <p>Cargando documentos…</p>;
  }
  return (
    <div className=" rounded-xl shadow-sm overflow-hidden border border-gray-500/50 ">
      <div className="p-6 border-b border-gray-500/50  bg-slate-500/10 dark:bg-base-100 ">
        <h3 className="text-lg font-semibold ">Documentos</h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4  hover:bg-slate-500/20 transition-colors  rounded-lg  "
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium uppercase ">{doc.document_type === "resultsStatus" ? "Estado de resultado": doc.document_type}</p>
                  <p className="text-sm ">
                    {doc.updated_at.toLocaleLowerCase().split("t")[0]} 
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={doc.storage_path} target="_blank" className="p-2 hover:bg-slate-500/20 rounded-lg transition-colors">
                  <Eye className="w-5 h-5 " />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
