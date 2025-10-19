import { CheckCircle, Clock } from 'lucide-react'
import React from 'react'
const paymentHistory = [
  { month: 'May', amount: 28500, status: 'paid' },
  { month: 'Jun', amount: 28500, status: 'paid' },
  { month: 'Jul', amount: 28500, status: 'paid' },
  { month: 'Ago', amount: 28500, status: 'paid' },
  { month: 'Sep', amount: 28500, status: 'paid' },
  { month: 'Oct', amount: 28500, status: 'paid' },
  { month: 'Nov', amount: 28500, status: 'pending' },
]
export default function Payments() {
  return (
    <div className=' rounded-xl shadow-sm border border-gray-500'>
      <div className='p-6 border-b border-gray-500'>
        <h3 className='text-lg font-semibold '>Historial de Pagos</h3>
      </div>
      <div className='p-6'>
        <div className='space-y-4'>
          {paymentHistory.map((payment, index) => (
            <div
              key={index}
              className='flex items-center justify-between p-4  rounded-lg hover:bg-gray-500/50 transition-colors'
            >
              <div className='flex items-center gap-4'>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    payment.status === 'paid' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}
                >
                  {payment.status === 'paid' ? (
                    <CheckCircle className='w-5 h-5 text-green-600' />
                  ) : (
                    <Clock className='w-5 h-5 text-yellow-600' />
                  )}
                </div>
                <div>
                  <p className='font-medium '>
                    Cuota {index + 1} - {payment.month} 2025
                  </p>
                  <p className='text-sm '>
                    {payment.status === 'paid' ? 'Pagado' : 'Pendiente'}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-bold '>${payment.amount.toLocaleString()}</p>
                {payment.status === 'pending' && (
                  <button className='mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors'>
                    Pagar Ahora
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
