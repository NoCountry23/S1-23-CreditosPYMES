import { Clock, DollarSign, Shield, TrendingUp, Users, Zap } from 'lucide-react'
import React from 'react'

export default function BenefitsSection() {
  return (
    <section id='beneficios' className='py-20 '>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold  mb-4'>
            ¿Por qué elegir FinanciaPYME?
          </h2>
          <p className='text-xl text-gray-500 max-w-2xl mx-auto'>
            Somos más que un préstamo, somos tu socio en el crecimiento
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[
            {
              icon: Clock,
              color: 'from-blue-500 to-blue-600',
              title: 'Respuesta Rápida',
              description:
                'Aprobación en 48 horas hábiles. Sin vueltas ni demoras innecesarias.',
            },
            {
              icon: Shield,
              color: 'from-green-500 to-green-600',
              title: '100% Seguro',
              description:
                'Plataforma encriptada y cumplimiento de normativas BCRA.',
            },
            {
              icon: DollarSign,
              color: 'from-purple-500 to-purple-600',
              title: 'Montos Flexibles',
              description: 'Desde $100.000 hasta $10.000.000 según necesites.',
            },
            {
              icon: TrendingUp,
              color: 'from-orange-500 to-orange-600',
              title: 'Sin Garantías Excesivas',
              description: 'Tu historial y proyección son tu mejor garantía.',
            },
            {
              icon: Users,
              color: 'from-pink-500 to-pink-600',
              title: 'Asesoría Personalizada',
              description: 'Un equipo dedicado para acompañarte en cada paso.',
            },
            {
              icon: Zap,
              color: 'from-cyan-500 to-cyan-600',
              title: 'Proceso Digital',
              description: 'Todo desde tu computadora o celular, sin papeleos.',
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className=' rounded-2xl p-8 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group'
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <benefit.icon className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-bold  mb-3'>{benefit.title}</h3>
              <p className='text-gray-400 leading-relaxed'>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
