import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
// Layout para usuarios con rol 'client' autenticados todas las rutas dentro de (client) van a usar este layout y solo serán accesibles para usuarios con rol 'client'
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const role = data?.user?.user_metadata?.role
  if (!(role === 'representante') || data.user === null) {
    return redirect('/')
  }
  return <>{children}</>
}
