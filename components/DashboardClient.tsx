import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function DashboardClient() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const role = data?.user?.user_metadata?.role
  if (!(role === 'client') || data.user === null) {
    return redirect('/')
  }
  return (
    <div>
      DashboardClient para autenticados como client
      <Link href='/upload-data' className='btn btn-link'>
        Ir a pagina de ejemplo
      </Link>
    </div>
  )
}
