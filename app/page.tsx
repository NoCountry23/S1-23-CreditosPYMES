import DashboardClient from '@/components/dashboardClient/DashboardClient'
import DashboardOperator from '@/components/dashboardOperator/DashboardOperator'
import Landing from '@/components/Landing'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (data.user === null) {
    return <Landing />
  }
  if (data.user.user_metadata.role === 'operator') {
    return <DashboardOperator />
  }
  if (data.user.user_metadata.role === 'client') {
    return <DashboardClient />
  }
}
