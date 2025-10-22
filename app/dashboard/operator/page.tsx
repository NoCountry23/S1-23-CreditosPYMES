import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type Prestamo = {
  id: number
  cliente: string | null
  monto: number | null
  estado: string | null
  created_at?: string
}

export default async function OperatorDashboard() {
  const supabase = await createClient()

  //Verificamos sesión
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Obtenemos rol desde metadatos
  const role = user.user_metadata?.role || 'unknown'

  if (role !== 'operator') {
    redirect('/unauthorized')
  }

  // Cargamos préstamos (ojo cuidado, la tabla es solo de muestra)
  const { data: prestamos, error } = await supabase
    .from('prestamo')
    .select('*')
    .returns<Prestamo[]>()

  return (
    <div className='bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6 text-blue-700'>
        Panel de Administración
      </h2>

      {error && (
        <p className='text-red-600 bg-red-50 p-3 rounded-lg'>
          Error al cargar préstamos: {error.message}
        </p>
      )}

      {!prestamos || prestamos.length === 0 ? (
        <div className='text-gray-600 text-center py-10 border rounded-lg bg-gray-50'>
          No hay préstamos registrados aún.
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full border border-gray-500/50 rounded-lg overflow-hidden'>
            <thead className='bg-gray-200 text-gray-700'>
              <tr>
                <th className='border p-2 text-left'>ID</th>
                <th className='border p-2 text-left'>Cliente</th>
                <th className='border p-2 text-left'>Monto</th>
                <th className='border p-2 text-left'>Estado</th>
              </tr>
            </thead>
            <tbody>
              {prestamos.map((p) => (
                <tr
                  key={p.id}
                  className='hover:bg-gray-100 transition-colors text-sm'
                >
                  <td className='border p-2'>{p.id}</td>
                  <td className='border p-2'>{p.cliente ?? 'Desconocido'}</td>
                  <td className='border p-2'>
                    {p.monto !== null ? `$${p.monto}` : '-'}
                  </td>
                  <td className='border p-2'>{p.estado ?? 'Pendiente'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
