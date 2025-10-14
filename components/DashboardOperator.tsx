import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function DashboardOperator() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const role = data?.user?.user_metadata?.role
  if (!(role === 'operator') || data.user === null) {
    return redirect('/')
  }
  return (
    <div>
      DashboardOperator para autenticados como operator
      <Link href='/some' className='btn btn-link'>
        Ir a pagina de ejemplo
      </Link>
    </div>
  )
}
