import React from "react";
import { CheckCircle } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: "Monto y Plazo" },
  { number: 2, title: "Detalles del Proyecto" },
  { number: 3, title: "Revisión y Confirmación" }
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
                currentStep > step.number
                  ? "bg-green-500 dark:bg-green-600 text-white"
                  : currentStep === step.number
                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="text-lg font-bold">{step.number}</span>
                )}
              </div>
              <p className={`mt-2 text-sm font-medium ${
                currentStep >= step.number 
                  ? "text-gray-900 dark:text-white" 
                  : "text-gray-400 dark:text-gray-500"
              }`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 flex-1 mx-2 rounded transition-all ${
                currentStep > step.number 
                  ? "bg-green-500 dark:bg-green-600" 
                  : "bg-gray-200 dark:bg-gray-700"
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
