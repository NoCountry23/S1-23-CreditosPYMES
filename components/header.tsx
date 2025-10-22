'use client'
import { ThemeSwitcher } from './theme-switcher'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { AuthButton } from './auth-button'
import { createClient } from '@/lib/supabase/client'

import { useQuery } from '@tanstack/react-query'

export default function Header() {
  const supabase = createClient()

  const {
    data: user,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser()
      return data?.user
    },
    refetchOnWindowFocus: false,
  })

  return (
    <header className=' border-b border-slate-500/50 shadow-md'>
      <div className='px-6 py-4'>
        <div className='flex items-center justify-between h-full'>
          <Link href='/' className='flex items-center gap-4'>
            <h1 className='text-2xl font-bold '>💼 FinanciaPYME</h1>
          </Link>
          {isLoading || isRefetching ? (
            <div className='skeleton h-10 w-1/3'></div>
          ) : (
            <div className='flex items-center gap-4'>
              <ThemeSwitcher />
              {user && user.user_metadata.role === 'representante' && (
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
          )}
        </div>
      </div>
    </header>
  )
}
