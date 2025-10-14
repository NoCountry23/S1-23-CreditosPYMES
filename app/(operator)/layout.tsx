import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
// Layout para clientes autenticados como 'operator' todas las rutas dentro de (operator) van a usar este layout y solo serán accesibles para usuarios con rol 'operator'
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const role = data?.user?.user_metadata?.role
  if (!(role === 'operator') || data.user === null) {
    return redirect('/')
  }
  return (
    <>
      <p>Layout para autenticados como operator</p>
      {children}
    </>
  )
}
