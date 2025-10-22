import { Zap, ArrowRight, Calculator, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function HeroSection() {
  return (
    <section className='relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white pt-32 pb-20 overflow-hidden'>
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

      <div className='max-w-7xl mx-auto px-6 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div>
            <div className='inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-400/50'>
              <Zap className='w-4 h-4 text-yellow-300' />
              <span className='text-sm font-medium'>
                Aprobación en 48 horas
              </span>
            </div>

            <h1 className='text-5xl lg:text-6xl font-bold leading-tight mb-6'>
              Impulsa tu PYME con el
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300'>
                Financiamiento Ideal
              </span>
            </h1>

            <p className='text-xl text-blue-100 mb-8 leading-relaxed'>
              Préstamos desde $100.000 hasta $10.000.000 para hacer crecer tu
              negocio. Proceso 100% digital, sin complicaciones.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 mb-8'>
              <button className='group px-8 py-4 text-white  hover:text-blue-900 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl flex items-center justify-center gap-2'>
                Solicitar Préstamo
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </button>
              <Link
                href='#calculadora'
                className='px-8 py-4 border-2 border-white/30 backdrop-blur-sm rounded-lg font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2'
              >
                <Calculator className='w-5 h-5' />
                Calcular Cuota
              </Link>
            </div>

            <div className='grid grid-cols-3 gap-6 pt-8 border-t border-blue-700/50'>
              <div>
                <div className='text-3xl font-bold mb-1'>+500</div>
                <div className='text-sm text-blue-200'>PYMEs Financiadas</div>
              </div>
              <div>
                <div className='text-3xl font-bold mb-1'>$2.5M</div>
                <div className='text-sm text-blue-200'>Monto Promedio</div>
              </div>
              <div>
                <div className='text-3xl font-bold mb-1'>4.8★</div>
                <div className='text-sm text-blue-200'>Calificación</div>
              </div>
            </div>
          </div>

          <div className='relative'>
            <div className=' rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center'>
                  <CheckCircle className='w-7 h-7 text-white' />
                </div>
                <div>
                  <h3 className='text-xl font-bold '>Solicita en 10 minutos</h3>
                  <p className='text-sm text-gray-400'>Respuesta garantizada</p>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <CheckCircle className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5' />
                  <div>
                    <p className='font-semibold '>Sin requisitos complicados</p>
                    <p className='text-sm text-gray-400'>
                      Solo necesitas 2 años de antigüedad
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5' />
                  <div>
                    <p className='font-semibold '>Tasas competitivas</p>
                    <p className='text-sm text-gray-400'>
                      Desde 45% TNA para tu sector
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5' />
                  <div>
                    <p className='font-semibold '>Plazos flexibles</p>
                    <p className='text-sm text-gray-400'>
                      Hasta 60 meses para pagar
                    </p>
                  </div>
                </div>
              </div>

              <button className='w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all'>
                Comenzar Ahora
              </button>
            </div>

            <div className='absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400  px-4 py-2 rounded-full font-bold shadow-xl transform rotate-12'>
              🎉 0% comisión
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
