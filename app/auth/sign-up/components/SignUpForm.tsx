"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import ProcessSteps from "./ProcessSteps";
import {
  User,
  Building2,
  FileText,
  Upload,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
  Loader2Icon,
} from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export type FormDataSignUp = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  company: {
    companyName: string;
    tradeName: string;
    cuit: string;
    industry: string;
    yearsInBusiness: string;
    website: string;
    phone: string;
  };
  legalInfo: {
    address: string;
    city: string;
    province: string;
    zipCode: string;
    employees: string;
    estimatedAnnualBilling: string;
    activityDescription: string;
  };
  documents: File[];
  acceptTerms: boolean;
};
const steps = [
  { number: 1, title: "Datos de Acceso", icon: User },
  { number: 2, title: "Datos de la Empresa", icon: Building2 },
  { number: 3, title: "Información Legal", icon: FileText },
  { number: 4, title: "Documentación", icon: Upload },
];
export default function SignUpForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const methods = useForm<FormDataSignUp>();

  const handleNext = async () => {
    const fieldsToValidate =
      (currentStep === 1 && "user") ||
      (currentStep === 2 && "company") ||
      "legalInfo";
    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFileUpload = (fieldName: string, files: FileList | null) => {
    if (files) {
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldName]: Array.from(files),
      }));
    }
  };

  const onSubmit = useMutation({
    mutationFn: async (data: FormDataSignUp) => {
      const { user, company, legalInfo, documents } = data;
      // crea el usuario
      try {
        const resCreateClient = await fetch(
          "/api/auth/register-representante",
          {
            method: "POST",
            body: JSON.stringify({
              nombre: user.firstName,
              apellido: user.lastName,
              email: user.email,
              password: user.password,
            }),
          },
        );
        if (!resCreateClient.ok) {
          throw new Error("Error al crear el usuario", {
            cause: await resCreateClient.json().then((res) => res.error),
          });
        }
        // crear empresa (company y legalInfo)
        // crear documentos
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      router.push("/auth/sign-up-success");
    },
  });
  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto p-6">
      <h1 className="text-center font-bold text-3xl">Regístrate ahora</h1>
      <div className="flex  gap-10 ">
        <ProcessSteps steps={steps} currentStep={currentStep} />
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => onSubmit.mutate(data))}
          className="flex flex-col w-full  gap-4"
        >
          {currentStep === 1 && <FirstStep />}
          {currentStep === 2 && <SecondStep />}
          {currentStep === 3 && <ThirdStep />}
          {currentStep === 4 && (
            <FourthStep
              handleFileUpload={handleFileUpload}
              uploadedFiles={uploadedFiles}
            />
          )}
          <div className="flex justify-between flex-col lg:flex-row ">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="flex items-center border border-slate-500/50 justify-center gap-2 px-6 py-3  text-gray rounded-lg hover:text-gray-500 transition-all font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>
            )}
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/auth/login"
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-all"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700  rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700  rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                {onSubmit.isPending ? (
                  <Loader2Icon className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Completar Registro
                  </>
                )}
              </button>
            )}
          </div>
        </form>
        {/* Progress Indicator */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Paso {currentStep} de 4
        </div>
      </FormProvider>
    </div>
  );
}
