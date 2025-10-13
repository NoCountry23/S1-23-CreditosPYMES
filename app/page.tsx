import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (data.user === null) {
    return (
      <main className='min-h-screen flex flex-col items-center'>
        <p>You are not signed in</p>
      </main>
    )
  }
  if (data.user.user_metadata.role === 'operator') {
    return (
      <main className='min-h-screen flex flex-col items-center'>
        <p>You are signed in as operator</p>
      </main>
    )
  }
  if (data.user.user_metadata.role === 'client') {
    return (
      <main className='min-h-screen flex flex-col items-center'>
        <p>You are signed in as client</p>
      </main>
    )
  }
}
