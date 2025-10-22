import Link from 'next/link'
import { Button } from './ui/button'
import { User } from '@supabase/supabase-js'
import HeaderUserMenu from './HeaderUserMenu'

export function AuthButton({ user }: { user: User | null | undefined }) {
  return user ? (
    <HeaderUserMenu user={user} />
  ) : (
    <div className='flex gap-2 flex-wrap justify-end'>
      <Button asChild variant={'outline'}>
        <Link href='/auth/login'>Iniciar sesión</Link>
      </Button>
      <Button
        asChild
        variant={'default'}
        className='bg-blue-700 hover:bg-blue-900 text-white'
      >
        <Link href='/auth/sign-up'>Registrarme</Link>
      </Button>
    </div>
  )
}
