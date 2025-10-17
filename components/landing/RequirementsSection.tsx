import { CheckCircle, FileText } from 'lucide-react'
import React from 'react'

export default function RequirementsSection() {
  return (
    <section id='requisitos' className='py-20 '>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold  mb-4'>Requisitos Mínimos</h2>
          <p className='text-xl text-gray-400'>
            ¿Tu empresa califica? Revisa estos requisitos básicos
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          <div className='bg-gradient-to-br from-blue-50 to-blue-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8'>
            <h3 className='text-2xl font-bold  mb-6'>Requisitos Generales</h3>
            <ul className='space-y-4'>
              {[
                'Empresa constituida con mínimo 2 años de antigüedad',
                'CUIT activo y al día con AFIP',
                'Facturación anual mínima de $500.000',
                'Sin deudas en mora en el sistema financiero',
                'Cuenta bancaria a nombre de la empresa',
              ].map((req, index) => (
                <li key={index} className='flex items-start gap-3'>
                  <CheckCircle className='w-6 h-6 text-green-600 flex-shrink-0 mt-0.5' />
                  <span className='text-gray-500'>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='bg-gradient-to-br from-purple-50 to-purple-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8'>
            <h3 className='text-2xl font-bold  mb-6'>
              Documentación Necesaria
            </h3>
            <ul className='space-y-4'>
              {[
                'DNI del titular o representante legal',
                'Constancia de inscripción AFIP',
                'Últimos 2 estados contables',
                'Resúmenes bancarios (últimos 6 meses)',
                'Estatuto o contrato social (opcional)',
              ].map((doc, index) => (
                <li key={index} className='flex items-start gap-3'>
                  <FileText className='w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5' />
                  <span className='text-gray-500'>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
