"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";
import FourthStep from "./components/FourthStep";
import { StepContext } from "./context";
interface FormData {
  companyName: string;
  financialInfo: string;
  amount: string;
}
// Custom context para manejar el paso del formulario multi-step en los componentes hijos
// export const StepContext = React.createContext<{
//   step: number;
//   setStep: React.Dispatch<React.SetStateAction<number>>;
// } | null>(null);

export default function Page() {
  const [step, setStep] = React.useState(1);
  const methods = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <main className="space-y-4">
      <h1 className="text-center font-bold text-3xl">Subir data</h1>
      <div className="flex justify-center gap-10">
        <ul className="steps">
          <li className={`step ${step >= 1 && "step-primary"}`}>
            Datos empresa{" "}
          </li>
          <li className={`step ${step >= 2 && "step-primary"}`}>
            Información financiera
          </li>
          <li className={`step ${step >= 3 && "step-primary"}`}>
            Monto y condiciones
          </li>
          <li className={`step ${step >= 4 && "step-primary"}`}>Revisión</li>
        </ul>
      </div>
      <FormProvider {...methods}>
        <StepContext.Provider value={{ step, setStep }}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-4"
          >
            {step === 1 && <FirstStep />}
            {step === 2 && <SecondStep />}
            {step === 3 && <ThirdStep />}
            {step === 4 && <FourthStep />}
          </form>
        </StepContext.Provider>
      </FormProvider>
    </main>
  );
}
