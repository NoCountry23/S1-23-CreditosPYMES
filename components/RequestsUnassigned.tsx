'use client'
import { AlertTriangle, Calendar, Search, User } from 'lucide-react'
import React, { useState } from 'react'

export default function RequestsUnassigned() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Pedidos sin asignar
  const unassignedRequests = [
    {
      id: 'SOL-2025-0156',
      company: 'Distribuidora del Sur S.A.',
      cuit: '30-71234567-8',
      amount: 850000,
      purpose: 'Capital de Trabajo',
      submittedDate: '2025-10-14',
      daysWaiting: 0,
      industry: 'Comercio',
      priority: 'high',
    },
    {
      id: 'SOL-2025-0155',
      company: 'Tech Solutions PYME',
      cuit: '30-71234568-9',
      amount: 450000,
      purpose: 'Inversión en Equipamiento',
      submittedDate: '2025-10-13',
      daysWaiting: 1,
      industry: 'Tecnología',
      priority: 'medium',
    },
    {
      id: 'SOL-2025-0154',
      company: 'Construcciones Roca',
      cuit: '30-71234569-0',
      amount: 1200000,
      purpose: 'Expansión del Negocio',
      submittedDate: '2025-10-13',
      daysWaiting: 1,
      industry: 'Construcción',
      priority: 'high',
    },
    {
      id: 'SOL-2025-0153',
      company: 'Café Gourmet Express',
      cuit: '30-71234570-1',
      amount: 300000,
      purpose: 'Refacción Local',
      submittedDate: '2025-10-12',
      daysWaiting: 2,
      industry: 'Gastronomía',
      priority: 'low',
    },
    {
      id: 'SOL-2025-0152',
      company: 'Autopartes Centro',
      cuit: '30-71234571-2',
      amount: 650000,
      purpose: 'Capital de Trabajo',
      submittedDate: '2025-10-11',
      daysWaiting: 3,
      industry: 'Automotriz',
      priority: 'medium',
    },
  ]

  const handleAssignRequest = (requestId: string) => {
    alert(
      `Solicitud ${requestId} asignada exitosamente. Ahora puedes verla en "Mis Solicitudes Asignadas"`
    )
  }
  return (
    <div className='space-y-4'>
      {/* Search and Filter */}
      <div className='flex gap-4 mb-6'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5' />
          <input
            type='text'
            placeholder='Buscar por empresa, CUIT o ID...'
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value='all'>Todas las prioridades</option>
          <option value='high'>Prioridad Alta</option>
          <option value='medium'>Prioridad Media</option>
          <option value='low'>Prioridad Baja</option>
        </select>
      </div>

      {/* Unassigned Requests Cards */}
      {unassignedRequests.map((request) => (
        <div
          key={request.id}
          className=' rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow'
        >
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-2'>
                <h3 className='text-lg font-semibold '>{request.company}</h3>
                {request.daysWaiting > 2 && (
                  <span className='inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium'>
                    <AlertTriangle className='w-3 h-3' />
                    {request.daysWaiting} días esperando
                  </span>
                )}
              </div>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
                <div>
                  <p className='text-xs text-gray-500'>ID Solicitud</p>
                  <p className='font-medium text-sm'>{request.id}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-500'>CUIT</p>
                  <p className='font-medium text-sm'>{request.cuit}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-500'>Monto</p>
                  <p className='font-bold text-blue-600'>
                    ${request.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-gray-500'>Rubro</p>
                  <p className='font-medium text-sm'>{request.industry}</p>
                </div>
              </div>
              <div className='mt-3'>
                <p className='text-xs text-gray-500'>Destino</p>
                <p className='text-sm text-gray-700'>{request.purpose}</p>
              </div>
              <div className='mt-2 flex items-center gap-2 text-xs text-gray-500'>
                <Calendar className='w-4 h-4' />
                Enviada el {request.submittedDate}
              </div>
            </div>
            <button
              onClick={() => handleAssignRequest(request.id)}
              className='ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium'
            >
              <User className='w-4 h-4' />
              Asignarme
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
