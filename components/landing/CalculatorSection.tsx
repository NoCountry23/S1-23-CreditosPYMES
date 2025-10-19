'use client'
import React, { useState } from 'react'

export default function CalculatorSection() {
  const [loanAmount, setLoanAmount] = useState(500000)
  const [loanTerm, setLoanTerm] = useState(24)

  const calculateMonthlyPayment = () => {
    const rate = 0.45 / 12
    const payment =
      (loanAmount * (rate * Math.pow(1 + rate, loanTerm))) /
      (Math.pow(1 + rate, loanTerm) - 1)
    return payment.toFixed(0)
  }
  return (
    <section
      id='calculadora'
      className='py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white'
    >
      <div className='max-w-4xl mx-auto px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold mb-4'>Calculadora de Préstamo</h2>
          <p className='text-xl text-gray-300'>
            Descubre cuánto puedes solicitar y cuál sería tu cuota mensual
          </p>
        </div>

        <div className=' rounded-2xl p-8 lg:p-12 '>
          <div className='space-y-8'>
            <div>
              <div className='flex items-center justify-between mb-4'>
                <label className='text-lg font-semibold'>
                  Monto del Préstamo
                </label>
                <div className='text-3xl font-bold text-blue-600'>
                  ${loanAmount.toLocaleString()}
                </div>
              </div>
              <input
                type='range'
                min='100000'
                max='10000000'
                step='50000'
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                className='w-full h-3  rounded-lg appearance-none cursor-pointer'
              />
              <div className='flex justify-between text-sm text-gray-500 mt-2'>
                <span>$100.000</span>
                <span>$10.000.000</span>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between mb-4'>
                <label className='text-lg font-semibold'>Plazo</label>
                <div className='text-3xl font-bold text-blue-600'>
                  {loanTerm} meses
                </div>
              </div>
              <input
                type='range'
                min='12'
                max='60'
                step='12'
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                className='w-full h-3  rounded-lg appearance-none cursor-pointer'
              />
              <div className='flex justify-between text-sm text-gray-500 mt-2'>
                <span>12 meses</span>
                <span>60 meses</span>
              </div>
            </div>

            <div className='bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-xl p-8'>
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <p className='text-gray-400 mb-2'>Cuota Mensual Estimada</p>
                  <p className='text-4xl font-bold text-blue-600'>
                    ${parseFloat(calculateMonthlyPayment()).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className='text-gray-400 mb-2'>Total a Pagar</p>
                  <p className='text-4xl font-bold '>
                    $
                    {(
                      parseFloat(calculateMonthlyPayment()) * loanTerm
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className='text-sm text-gray-400 mt-6'>
                * TNA: 45%. Valores estimados sujetos a aprobación crediticia.
              </p>
            </div>

            <button className='w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg'>
              Solicitar este Préstamo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
