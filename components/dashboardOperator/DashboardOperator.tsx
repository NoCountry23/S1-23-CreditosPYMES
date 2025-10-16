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
'use client'
import { useState } from 'react'
import MyRequestsAssigned from './MyRequestsAssigned'
import NavigationTabs from './NavigationTabs'
import RequestsUnassigned from './RequestsUnassigned'

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('requests-unassigned')
  return (
    <>
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className='px-6 py-8'>
        {activeTab === 'requests-unassigned' && <RequestsUnassigned />}
        {activeTab === 'my-requests-assigned' && <MyRequestsAssigned />}
      </main>
    </>
  )
}

export default OperatorDashboard
