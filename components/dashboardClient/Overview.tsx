import {
  DollarSign,
  TrendingUp,
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react'
import React, { JSX } from 'react'

// Datos de ejemplo
const loanApplications = [
  {
    id: 'SOL-2025-0123',
    amount: 500000,
    status: 'approved',
    date: '2025-10-01',
    purpose: 'Capital de Trabajo',
  },
  {
    id: 'SOL-2025-0089',
    amount: 800000,
    status: 'pending',
    date: '2025-10-10',
    purpose: 'Inversión en Equipamiento',
  },
  {
    id: 'SOL-2025-0045',
    amount: 300000,
    status: 'in_review',
    date: '2025-09-15',
    purpose: 'Expansión del Negocio',
  },
]
const getStatusBadge = (status: string) => {
  const statusConfig: {
    [key: string]: { text: string; class: string; icon: JSX.Element }
  } = {
    approved: {
      text: 'Aprobado',
      class: 'bg-green-100 text-green-800',
      icon: <CheckCircle className='w-4 h-4' />,
    },
    pending: {
      text: 'Pendiente',
      class: 'bg-yellow-100 text-yellow-800',
      icon: <Clock className='w-4 h-4' />,
    },
    in_review: {
      text: 'En Revisión',
      class: 'bg-blue-100 text-blue-800',
      icon: <AlertCircle className='w-4 h-4' />,
    },
    rejected: {
      text: 'Rechazado',
      class: 'bg-red-100 text-red-800',
      icon: <AlertCircle className='w-4 h-4' />,
    },
  }
  const config = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.class}`}
    >
      {config.icon}
      {config.text}
    </span>
  )
}
export default function Overview({
  activeLoan,
}: {
  activeLoan: {
    totalAmount: number
    monthsRemaining: number
    remainingBalance: number
    monthlyPayment: number
    nextPaymentDate: string
  }
}) {
  return (
    <div className='space-y-6'>
      {/* KPI Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className=' rounded-xl shadow-sm p-6 bg-slate-500/10 dark:bg-base-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium '>Préstamo Activo</p>
              <p className='text-2xl font-bold  mt-2'>
                ${activeLoan.totalAmount.toLocaleString()}
              </p>
              <p className='text-xs  mt-1'>Desembolsado en Mayo 2025</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <DollarSign className='w-6 h-6 text-blue-600' />
            </div>
          </div>
        </div>

        <div className=' rounded-xl shadow-sm p-6 bg-slate-500/10 dark:bg-base-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium '>Saldo Pendiente</p>
              <p className='text-2xl font-bold  mt-2'>
                ${activeLoan.remainingBalance.toLocaleString()}
              </p>
              <p className='text-xs  mt-1'>
                {activeLoan.monthsRemaining} cuotas restantes
              </p>
            </div>
            <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
              <TrendingUp className='w-6 h-6 text-purple-600' />
            </div>
          </div>
        </div>

        <div className=' rounded-xl shadow-sm p-6 bg-slate-500/10 dark:bg-base-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium '>Próximo Pago</p>
              <p className='text-2xl font-bold  mt-2'>
                ${activeLoan.monthlyPayment.toLocaleString()}
              </p>
              <p className='text-xs  mt-1'>
                Vence: {activeLoan.nextPaymentDate}
              </p>
            </div>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <CreditCard className='w-6 h-6 text-green-600' />
            </div>
          </div>
        </div>

        <div className=' rounded-xl shadow-sm p-6 bg-slate-500/10 dark:bg-base-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium '>Solicitudes</p>
              <p className='text-2xl font-bold  mt-2'>
                {loanApplications.length}
              </p>
              <p className='text-xs  mt-1'>1 pendiente de revisión</p>
            </div>
            <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center'>
              <FileText className='w-6 h-6 text-orange-600' />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className=' rounded-xl shadow-sm bg-slate-500/10 dark:bg-base-100'>
        <div className='p-6 border-b border-gray-500/50   bg-slate-500/10 dark:bg-base-100'>
          <h3 className='text-lg font-semibold '>Solicitudes Recientes</h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className=''>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>
                  ID Solicitud
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>
                  Fecha
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>
                  Monto
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>
                  Destino
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className=' divide-y divide-gray-500'>
              {loanApplications.map((app) => (
                <tr key={app.id} className='hover:0/20 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                    {app.id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm '>
                    {app.date}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold '>
                    ${app.amount.toLocaleString()}
                  </td>
                  <td className='px-6 py-4 text-sm '>{app.purpose}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {getStatusBadge(app.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
