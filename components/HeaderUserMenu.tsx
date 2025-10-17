'use client'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { ChevronDown, User, Settings, HelpCircle } from 'lucide-react'
import React from 'react'
import { LogoutButton } from './logout-button'

export default function HeaderUserMenu({ user }: { user: SupabaseUser }) {
  const [showUserMenu, setShowUserMenu] = React.useState(false)
  const {
    email,
    user_metadata: { role, full_name, cuil },
  } = user
  return (
    <div className='relative z-20'>
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className='flex items-center gap-3 p-2 hover:bg-gray-500/50 rounded-lg transition-colors'
      >
        <div className='text-right hidden md:block'>
          <p className='text-sm font-medium '>{full_name || email}</p>
          <p className='text-xs text-gray-500'>{cuil || role}</p>
        </div>
        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center  font-semibold'>
          CL
        </div>
        <ChevronDown className='w-4 h-4  hidden lg:block' />
      </button>

      {/* User Dropdown */}
      {showUserMenu && (
        <div className='absolute right-0 mt-2 w-fit  rounded-lg shadow-xl border bg-background border-gray-500 overflow-hidden'>
          <div className='p-4  border-b border-gray-500'>
            <p className='font-semibold '>{full_name || email}</p>
            <p className='text-xs text-gray-500 mt-1'>{email}</p>
          </div>
          <div className='py-2'>
            <a
              href='#'
              className='flex items-center gap-3 px-4 py-2 hover:bg-gray-500/50 transition-colors'
            >
              <User className='w-4 h-4 ' />
              <span className='text-sm '>Mi Perfil</span>
            </a>
            <a
              href='#'
              className='flex items-center gap-3 px-4 py-2 hover:bg-gray-500/50 transition-colors'
            >
              <Settings className='w-4 h-4 ' />
              <span className='text-sm '>Configuración</span>
            </a>
            <a
              href='#'
              className='flex items-center gap-3 px-4 py-2 hover:bg-gray-500/50 transition-colors'
            >
              <HelpCircle className='w-4 h-4 ' />
              <span className='text-sm '>Centro de Ayuda</span>
            </a>
          </div>
          <div className='border-t border-gray-500 py-2 px-4'>
            {/* <button className='flex items-center gap-3 px-4 py-2 hover:bg-gray-500/50 transition-colors w-full text-red-600'>
            </button> */}
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  )
}
