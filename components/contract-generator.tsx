/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ContractGeneratorProps {
  onContractGenerated?: (data: any) => void;
}

export default function ContractGenerator({
  onContractGenerated,
}: ContractGeneratorProps) {
  const [prestamoId, setPrestamoId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que el ID sea un número
    const id = parseInt(prestamoId);
    if (isNaN(id) || id <= 0) {
      setError("Por favor ingresa un ID de préstamo válido");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/contracts/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prestamo_id: id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al generar el contrato");
      }

      setResult(data);
      onContractGenerated?.(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generar Contrato de Préstamo</CardTitle>
          <CardDescription>
            Ingresa el ID del préstamo para generar el contrato correspondiente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prestamoId">ID del Préstamo</Label>
              <Input
                id="prestamoId"
                type="number"
                placeholder="Ej: 123"
                value={prestamoId}
                onChange={(e) => setPrestamoId(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !prestamoId}
              className="w-full"
            >
              {isLoading ? "Generando contrato..." : "Generar Contrato"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Mostrar errores */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-red-600">
              <strong>Error:</strong> {error}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mostrar resultado exitoso */}
      {result && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">
              ✅ Contrato Generado Exitosamente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-green-700">
              <p>
                <strong>Mensaje:</strong> {result.message}
              </p>
            </div>

            {/* Información del préstamo */}
            {result.contract_data?.prestamo && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">
                  Información del Préstamo:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <strong>ID:</strong>{" "}
                    {result.contract_data.prestamo.id_prestamo}
                  </div>
                  <div>
                    <strong>Monto:</strong>{" "}
                    {result.contract_data.prestamo.monto}{" "}
                    {result.contract_data.prestamo.currency}
                  </div>
                  <div>
                    <strong>Plazo:</strong>{" "}
                    {result.contract_data.prestamo.term_months} meses
                  </div>
                  <div>
                    <strong>Estado:</strong>{" "}
                    {result.contract_data.prestamo.status}
                  </div>
                </div>
              </div>
            )}

            {/* Información de la empresa */}
            {result.contract_data?.prestamo?.pyme && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">
                  Información de la Empresa:
                </h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <strong>Empresa:</strong>{" "}
                    {result.contract_data.prestamo.pyme.company_name}
                  </div>
                  <div>
                    <strong>CUIL/CUIT:</strong>{" "}
                    {result.contract_data.prestamo.pyme.cuil_cuit}
                  </div>
                  <div>
                    <strong>Email:</strong>{" "}
                    {result.contract_data.prestamo.pyme.email}
                  </div>
                  <div>
                    <strong>Industria:</strong>{" "}
                    {result.contract_data.prestamo.pyme.industry}
                  </div>
                </div>
              </div>
            )}

            {/* Respuesta de DocuSeal */}
            {result.docuseal_response && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Respuesta de DocuSeal:</h4>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(result.docuseal_response, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
