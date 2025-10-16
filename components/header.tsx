'use client'
import React, { useEffect, useState } from 'react'
import { ThemeSwitcher } from './theme-switcher'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { AuthButton } from './auth-button'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export default function Header() {
  const supabase = createClient() // cliente de navegador
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // obtener sesión/usuario inicial
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null))

    // suscripción a cambios de auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )
    return () => listener.subscription.unsubscribe()
  }, [supabase])

  return (
    <header className=' border-b border-gray-500'>
      <div className='px-6 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-4'>
            <h1 className='text-2xl font-bold '>💼 FinanciaPYME</h1>
          </Link>
          <div className='flex items-center gap-4'>
            <ThemeSwitcher />
            {user && user.user_metadata.role === 'client' && (
              <Link
                href='/new-request'
                className='px-4 py-2 bg-blue-600  rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2'
              >
                <Plus className='w-4 h-4' />
                Nueva Solicitud
              </Link>
            )}
            {/* User Menu */}
            <AuthButton user={user} />
          </div>
        </div>
      </div>
    </header>
  )
}
