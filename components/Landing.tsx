import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
// Componente Landing para usuarios no autenticados, solo accesible si no hay un usuario autenticado
export default async function Landing() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!(data.user === null)) {
    return redirect('/')
  }
  return <div>Landing para no autenticados</div>
}
