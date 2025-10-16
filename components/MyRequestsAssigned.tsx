'use client'
import {
  Search,
  FileText,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import React, { useState } from 'react'
import DetailedView from './DetailedView'

export default function MyRequestsAssigned() {
  const [selectedRequest, setSelectedRequest] = useState<{ id: string } | null>(
    null
  )

  // Pedidos asignados al operador
  const myRequests = [
    {
      id: 'SOL-2025-0148',
      company: 'Logística Express S.R.L.',
      cuit: '30-71234572-3',
      amount: 950000,
      purpose: 'Flota de Vehículos',
      assignedDate: '2025-10-10',
      status: 'in_review',
      industry: 'Logística',
      revenue: 3500000,
      employees: 28,
      yearsInBusiness: 7,
      creditScore: 750,
      documentsComplete: true,
    },
    {
      id: 'SOL-2025-0145',
      company: 'Textil Modernos',
      cuit: '30-71234573-4',
      amount: 720000,
      purpose: 'Maquinaria',
      assignedDate: '2025-10-09',
      status: 'approved',
      industry: 'Textil',
      revenue: 2800000,
      employees: 35,
      yearsInBusiness: 12,
      creditScore: 820,
      documentsComplete: true,
    },
    {
      id: 'SOL-2025-0142',
      company: 'Imprenta Digital Plus',
      cuit: '30-71234574-5',
      amount: 380000,
      purpose: 'Capital de Trabajo',
      assignedDate: '2025-10-08',
      status: 'rejected',
      industry: 'Servicios',
      revenue: 950000,
      employees: 8,
      yearsInBusiness: 3,
      creditScore: 580,
      documentsComplete: false,
    },
  ]

  const handleViewDetails = (request: { id: string }) => {
    setSelectedRequest(request)
  }
  // const getStatusBadge = (status) => {
  //   const config = {
  //     in_review: {
  //       text: 'En Revisión',
  //       class: 'bg-blue-100 text-blue-800',
  //       icon: <Clock className='w-3 h-3' />,
  //     },
  //     approved: {
  //       text: 'Aprobado',
  //       class: 'bg-green-100 text-green-800',
  //       icon: <CheckCircle className='w-3 h-3' />,
  //     },
  //     rejected: {
  //       text: 'Rechazado',
  //       class: 'bg-red-100 text-red-800',
  //       icon: <XCircle className='w-3 h-3' />,
  //     },
  //   }
  //   const c = config[status]
  //   return (
  //     <span
  //       className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${c.class}`}
  //     >
  //       {c.icon}
  //       {c.text}
  //     </span>
  //   )
  // }
  return (
    <div className='space-y-4'>
      {/* Search */}
      <div className='mb-6'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5' />
          <input
            type='text'
            placeholder='Buscar en mis solicitudes...'
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
      </div>

      {/* My Requests Cards */}
      {myRequests.map((request) => (
        <div
          key={request.id}
          className=' rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow'
        >
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-2'>
                <h3 className='text-lg font-semibold '>{request.company}</h3>
                {request.status}
              </div>
              <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mt-4'>
                <div>
                  <p className='text-xs text-gray-500'>ID Solicitud</p>
                  <p className='font-medium text-sm'>{request.id}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-500'>Monto</p>
                  <p className='font-bold text-blue-600'>
                    ${request.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-gray-500'>Facturación Anual</p>
                  <p className='font-medium text-sm'>
                    ${request.revenue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-gray-500'>Score</p>
                  <p className='font-bold text-green-600'>
                    {request.creditScore}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-gray-500'>Empleados</p>
                  <p className='font-medium text-sm'>{request.employees}</p>
                </div>
              </div>
              <div className='mt-3 flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <FileText className='w-4 h-4 text-gray-400' />
                  <span className='text-sm text-gray-600'>
                    Docs:{' '}
                    {request.documentsComplete ? (
                      <span className='text-green-600 font-medium'>
                        Completos ✓
                      </span>
                    ) : (
                      <span className='text-orange-600 font-medium'>
                        Incompletos
                      </span>
                    )}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-xs text-gray-500'>
                  <Calendar className='w-4 h-4' />
                  Asignada el {request.assignedDate}
                </div>
              </div>
            </div>
            <div className='ml-4 flex gap-2'>
              {request.status === 'in_review' && (
                <button
                  onClick={() => handleViewDetails(request)}
                  className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium'
                >
                  <Eye className='w-4 h-4' />
                  Revisar
                </button>
              )}
              {request.status === 'approved' && (
                <button className='px-6 py-2 bg-green-100 text-green-700 rounded-lg cursor-default flex items-center gap-2 font-medium'>
                  <CheckCircle className='w-4 h-4' />
                  Aprobado
                </button>
              )}
              {request.status === 'rejected' && (
                <button className='px-6 py-2 bg-red-100 text-red-700 rounded-lg cursor-default flex items-center gap-2 font-medium'>
                  <XCircle className='w-4 h-4' />
                  Rechazado
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Detailed View Modal */}
      {selectedRequest && (
        <DetailedView
          request={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      )}
    </div>
  )
}
