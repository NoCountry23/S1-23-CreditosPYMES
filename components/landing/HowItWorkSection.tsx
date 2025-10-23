import {
  FileText,
  Users,
  DollarSign,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import React from "react";

export default function HowItWorkSection() {
  return (
    <section id="como-funciona" className="py-20 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold  mb-4">3 Pasos para tu Préstamo</h2>
          <p className="text-xl text-gray-400">Simple, rápido y transparente</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {[
            {
              step: "01",
              title: "Completa tu Solicitud",
              description:
                "Formulario online en 10 minutos. Necesitas datos de tu empresa y documentación básica.",
              icon: FileText,
            },
            {
              step: "02",
              title: "Evaluación Inmediata",
              description:
                "Nuestro equipo analiza tu solicitud en 24-48 horas. Te mantenemos informado en cada etapa.",
              icon: Users,
            },
            {
              step: "03",
              title: "Recibe tu Dinero",
              description:
                "Una vez aprobado, el dinero se acredita en tu cuenta bancaria en 24 horas.",
              icon: DollarSign,
            },
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-blue-50 to-blue-100  rounded-2xl p-8 h-full">
                <div className="text-6xl font-bold text-blue-300 mb-4">
                  {step.step}
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold  mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <ChevronRight className="w-12 h-12 text-blue-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg inline-flex items-center gap-2">
            Comenzar mi Solicitud
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
