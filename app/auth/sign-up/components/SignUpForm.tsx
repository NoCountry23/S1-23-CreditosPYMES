"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import ProcessSteps from "./ProcessSteps";
import { User, Building2, FileText, Upload } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export type FormDataSignUp = {
  user: {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
  }
  company: {
    companyName: string
    cuit: string
    industry: string
    email: string
    yearsInBusiness: string
    website: string
    phone: string
  }
  legalInfo: {
    address: string
    city: string
    province: string
    zipCode: string
    employees: string
    estimatedAnnualBilling: string
    activityDescription: string
  }
  acceptTerms: boolean
}
const steps = [
  { number: 1, title: "Datos de Acceso", icon: User },
  { number: 2, title: "Datos de la Empresa", icon: Building2 },
  { number: 3, title: "Información Legal", icon: FileText },
  { number: 4, title: "Documentación", icon: Upload },
];
export default function SignUpForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: File | null
  }>({});

  const methods = useForm<FormDataSignUp>({
    defaultValues: {
      user: {
        firstName: "juan",
        lastName: "perez",
        email: "l7t4w@example.com",
        password: "Cuenta123",
        confirmPassword: "Cuenta123",
      },
      company: {
        companyName: "empresa",
        cuit: "11-12345678-1",
        email: "l7t4w@example.com",
        industry: "industria",
        yearsInBusiness: "10",
        website: "http://www.empresa.com",
      },
      legalInfo: {
        address: "calle 123",
        city: "ciudad",
        province: "CABA",
        zipCode: "1234",
        employees: "10",
        estimatedAnnualBilling: "100000",
        activityDescription: "actividad",
      },
    },
  });

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

  const handleFileUpload = (fieldName: string, file: File | null) => {
    if (file) {
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
    } else {
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  async function createUser(user: FormDataSignUp["user"]) {
    const resCreateClient = await fetch("/api/auth/register-representante", {
      method: "POST",
      body: JSON.stringify({
        nombre: user.firstName,
        apellido: user.lastName,
        email: user.email,
        password: user.password,
      }),
    });
    if (!resCreateClient.ok) {
      throw new Error("Error al crear el usuario", {
        cause: await resCreateClient.json().then((res) => res.error),
      });
    }
    const data = await resCreateClient.json();
    return data;
  }
  async function createCompany(
    company: FormDataSignUp["company"],
    legalInfo: FormDataSignUp["legalInfo"],
    userId: string
  ) {
    const resCreatePyme = await fetch("/api/pyme", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        company_name: company.companyName,
        cuil_cuit: company.cuit,
        address: legalInfo.address,
        legal_address: legalInfo.address,
        industry: company.industry,
        annual_billing_estimated: Number(legalInfo.estimatedAnnualBilling),
        amount_employees: Number(legalInfo.employees),
        merch_years: Number(company.yearsInBusiness),
        city: legalInfo.city,
        local_state: legalInfo.province,
        postal_code: Number(legalInfo.zipCode),
        activity_description: legalInfo.activityDescription,
        phone: company.phone,
        email: company.email,
      }),
    });
    if (!resCreatePyme.ok) {
      throw new Error("Error al crear la empresa", {
        cause: await resCreatePyme.json().then((res) => res.error),
      });
    }
    const data = await resCreatePyme.json();
    return data;
  }
  async function uploadDocuments(companyId: string, userId: string) {
    if (uploadedFiles[0] === null) {
      return;
    } else {
      await Promise.all(
        Object.entries(uploadedFiles).map(async ([key, value]) => {
          const formData = new FormData();
          formData.append("pyme_id", companyId);
          formData.append("uploaded_by", userId);
          formData.append("file", value as File);
          formData.append("document_type", key);

          const res = await fetch("/api/upload/support-documents", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            throw new Error("Error al subir documento", {
              cause: await res.json().then((r) => r.error),
            });
          }
        })
      );
    }
  }
  const onSubmit = useMutation({
    mutationFn: async (data: FormDataSignUp) => {
      const { user, company, legalInfo } = data;
      try {
        // crea el usuario
        const {
          user: { id: userId },
        } = await createUser(user);

        // crear empresa (company y legalInfo)
        const { id: companyId } = await createCompany(
          company,
          legalInfo,
          userId
        );

        // crear documentos
        await uploadDocuments(companyId, userId);
        // if (companyId && userId) {
        // }
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      router.push("/auth/sign-up-success");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.cause as string);
    },
  });

  return (
    <div className='flex flex-col gap-4  w-full max-w-4xl mx-auto p-6'>
      <h1 className='text-center font-bold text-3xl'>Regístrate ahora</h1>
      <div className='flex  gap-10 '>
        <ProcessSteps steps={steps} currentStep={currentStep} />
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => onSubmit.mutate(data))}
          className='flex flex-col w-full  gap-4'
        >
          {currentStep === 1 && <FirstStep handleNext={handleNext} />}
          {currentStep === 2 && (
            <SecondStep
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          )}
          {currentStep === 3 && (
            <ThirdStep
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          )}
          {currentStep === 4 && (
            <FourthStep
              handleFileUpload={handleFileUpload}
              uploadedFiles={uploadedFiles}
              loading={onSubmit.isPending}
              handlePrevious={handlePrevious}
            />
          )}
        </form>
        {/* Progress Indicator */}
        <div className='text-center mt-6 text-sm text-gray-500'>
          Paso {currentStep} de 4
        </div>
      </FormProvider>
    </div>
  );
}
