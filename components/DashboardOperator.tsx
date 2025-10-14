// import { createClient } from '@/lib/supabase/server'
// import Link from 'next/link'
// import { redirect } from 'next/navigation'
// import React from 'react'

// export default async function DashboardOperator() {
//   const supabase = await createClient()
//   const { data } = await supabase.auth.getUser()
//   const role = data?.user?.user_metadata?.role
//   if (!(role === 'operator') || data.user === null) {
//     return redirect('/')
//   }
//   return (
//     <div>
//       DashboardOperator para autenticados como operator
//       <Link href='/some' className='btn btn-link'>
//         Ir a pagina de ejemplo
//       </Link>
//     </div>
//   )
// }
// 'use client'
import RequestsUnassigned from './RequestsUnassigned'
import MyRequestsAssigned from './MyRequestsAssigned'

const OperatorDashboard = () => {
  return (
    <div className='min-h-screen '>
      {/* Header */}
      <header className=' border-b border-gray-200'>
        <div className='px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <h1 className='text-2xl font-bold '>🏦 Panel de Operador</h1>
            </div>
            <div className='flex items-center gap-4'>
              <div className='text-right'>
                <p className='text-sm font-medium '>Juan Pérez</p>
                <p className='text-xs text-gray-500'>Operador Senior</p>
              </div>
              <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold'>
                JP
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      {/* <div className='bg-white border-b border-gray-200 px-6 py-4'>
        <div className='grid grid-cols-4 gap-6'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-blue-600'>
              {unassignedRequests.length}
            </p>
            <p className='text-sm text-gray-600'>Sin Asignar</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-yellow-600'>
              {myRequests.filter((r) => r.status === 'in_review').length}
            </p>
            <p className='text-sm text-gray-600'>En Revisión</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-green-600'>
              {myRequests.filter((r) => r.status === 'approved').length}
            </p>
            <p className='text-sm text-gray-600'>Aprobadas Hoy</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-red-600'>
              {myRequests.filter((r) => r.status === 'rejected').length}
            </p>
            <p className='text-sm text-gray-600'>Rechazadas Hoy</p>
          </div>
        </div>
      </div> */}
      <div className='tabs tabs-lift'>
        <input
          type='radio'
          name='tabs'
          className='tab bg-background text-foreground'
          aria-label='Solitudes Sin Asignar'
          defaultChecked
        />
        <div className='tab-content  border-base-300 p-6'>
          <RequestsUnassigned />
        </div>

        <input
          type='radio'
          name='tabs'
          className='tab bg-background text-foreground'
          aria-label='Mis Solicitudes Asignadas'
        />
        <div className='tab-content  border-base-300 p-6'>
          <MyRequestsAssigned />
        </div>
      </div>
    </div>
  )
}

export default OperatorDashboard
