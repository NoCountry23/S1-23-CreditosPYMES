import { ArrowRight, HeadphonesIcon } from 'lucide-react'
import React from 'react'

export default function CtaFinalSection() {
  return (
    <section className='py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden'>
      <div className='absolute inset-0 opacity-10'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className='max-w-4xl mx-auto px-6 text-center relative z-10'>
        <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
          ¿Listo para hacer crecer tu negocio?
        </h2>
        <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
          Únete a más de 500 PYMEs que ya confiaron en nosotros. Tu próximo gran
          paso comienza aquí.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button className='group px-10 py-5  hover:text-blue-900 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl flex items-center justify-center gap-2'>
            Solicitar Préstamo Ahora
            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
          </button>
          <button className='px-10 py-5 border-2 border-white backdrop-blur-sm rounded-lg font-bold text-lg hover:/10 transition-all flex items-center justify-center gap-2'>
            <HeadphonesIcon className='w-5 h-5' />
            Hablar con un Asesor
          </button>
        </div>
      </div>
    </section>
  )
}
