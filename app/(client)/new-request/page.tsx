"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StepIndicator from "./components/StepIndicator";
import LoanAmountStep from "./components/LoanAmountStep";
import ProjectDetailsStep from "./components/ProjectDetailsStep";
import ReviewStep from "./components/ReviewStep";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { usePyme } from "@/hooks/usePyme";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
interface FormDataNewRequest {
  loanAmount: number;
  loanTerm: string;
  projectDescription: string;
}
export default function NewRequestPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<FormDataNewRequest>();
  const {data: user} = useUser();
  const { pyme} = usePyme();
  
  const handleNext = async () => {
    let fieldsToValidate: (keyof FormDataNewRequest)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ["loanAmount", "loanTerm"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["projectDescription"];
    }

    const isValid = await methods.trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  async function createRequest(data: { [p: string]: unknown }) {

    const response = await fetch("/api/prestamos-temp", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al enviar la solicitud", {
        cause: await response.json().then((res) => res.error),
      });
    }
    const newRequest = await response.json();
    return newRequest;
  } 
  async function createSuggestion(loanId: string) {
    await fetch("/api/test-risk", {
      method: "POST",
      body: JSON.stringify({ prestamo_id: loanId,
        pyme_id: pyme?.id
      }),
    });
  }
  const createNewRequest = useMutation({
    mutationFn: async (data: { [p: string]: unknown }) => {
      try {
      
        const ResNewRequest = await createRequest(data);
        await createSuggestion(ResNewRequest.id);
      } catch (error) {
        throw error;
      }

    },
    onSuccess: () => {
      toast.success("Solicitud de préstamo creada exitosamente");
      router.push("/");
    },
    onError: (error) => {
      console.log(error.cause, "error");
    },
  });
  const onSubmit = (data: FormDataNewRequest) => {
  
    createNewRequest.mutate(
      {
        pyme_id: pyme?.id,
        monto: Number(data.loanAmount),
        term_months: Number(data.loanTerm),
        cant_cuo: Number(data.loanTerm),
        purpose: data.projectDescription,
        representante_id: user?.id,
      }
    );
  };

  return (
    <div className="min-h-screen  ">
      {/* Header */}
      <div className=" border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Nueva Solicitud de Préstamo
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Comercial López S.R.L.</p>
              </div>
            </div>
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm">
              ← Volver al Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <StepIndicator currentStep={currentStep} />

        {/* Main Form */}
        <div className=" dark:bg-base-100 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {currentStep === 1 && (
                <LoanAmountStep
                  
                />
              )}
              {currentStep === 2 && (
                <ProjectDetailsStep 
                  
                />
              )}
              {currentStep === 3 && (
                <ReviewStep 
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between px-8 py-6   border-t border-gray-200 dark:border-gray-700 rounded-b-xl">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover: dark:hover:bg-gray-700 transition-all font-medium"
                    >
                    ← Anterior
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all"
                  >
                  Guardar Borrador
                  </button>
                
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg hover:shadow-xl"
                    >
                    Siguiente →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium shadow-lg hover:shadow-xl"
                    >
                      {createNewRequest.isPending ? 
                        <Loader2Icon className="w-6 h-6 animate-spin" /> : "✓ Enviar Solicitud"}
                    
                    </button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-2xl">💡</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ¿Necesitas ayuda?
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Nuestro equipo está disponible para asesorarte en tu solicitud de préstamo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all text-sm font-medium shadow-md">
                  Chat en Vivo
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all text-sm font-medium shadow-md">
                  Llamar al 0800-123-4567
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
