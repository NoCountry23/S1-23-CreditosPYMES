'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{
    email: string
    password: string
    repeatPassword: string
  }>()
  const handleSignUp = async ({
    email,
    password,
    repeatPassword,
  }: {
    email: string
    password: string
    repeatPassword: string
  }) => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSignUp)} className='w-full'>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email format',
                    },
                  })}
                />
                {errors.email && (
                  <p className='text-sm text-red-500'>
                    {errors.email.message?.toString()}
                  </p>
                )}
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters long',
                    },
                  })}
                />
                {errors.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message?.toString()}
                  </p>
                )}
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='repeat-password'>Repeat Password</Label>
                </div>
                <Input
                  id='repeat-password'
                  type='password'
                  {...register('repeatPassword', {
                    required: {
                      value: true,
                      message: 'Repeat Password is required',
                    },
                  })}
                />
                {errors.repeatPassword && (
                  <p className='text-sm text-red-500'>
                    {errors.repeatPassword.message?.toString()}
                  </p>
                )}
              </div>
              {error && <p className='text-sm text-red-500'>{error}</p>}
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Creating an account...' : 'Sign up'}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <Link href='/auth/login' className='underline underline-offset-4'>
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
