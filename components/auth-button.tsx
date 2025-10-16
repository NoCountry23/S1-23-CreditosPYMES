import Link from 'next/link'
import { Button } from './ui/button'
import { User } from '@supabase/supabase-js'
import HeaderUserMenu from './HeaderUserMenu'

export function AuthButton({ user }: { user: User | null }) {
  return user ? (
    <HeaderUserMenu user={user} />
  ) : (
    <div className='flex gap-2'>
      <Button asChild variant={'outline'}>
        <Link href='/auth/login'>Iniciar sesión</Link>
      </Button>
      <Button asChild variant={'default'}>
        <Link href='/auth/sign-up'>Registrarme</Link>
      </Button>
    </div>
  )
}
