'use client'
import React, { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Award,
  CheckCircle,
  Clock,
  XCircle,
  Edit2,
  Save,
  X,
  Shield,
} from 'lucide-react'
import Link from 'next/link'

const OperatorProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Juan Pérez',
    email: 'juan.perez@financiapyme.com',
    phone: '+54 11 4567-8900',
    position: 'Operador Senior',
    department: 'Análisis Crediticio',
    location: 'CABA, Argentina',
    joinDate: '2022-03-15',
    employeeId: 'OP-0234',
  })

  const stats = {
    processed: 156,
    approved: 98,
    rejected: 42,
    pending: 16,
    avgProcessingTime: '18 horas',
    approvalRate: 62.8,
  }

  const recentActivity = [
    {
      id: 'SOL-2025-0148',
      action: 'Aprobó',
      company: 'Logística Express',
      date: '2025-10-19 14:30',
      status: 'approved',
    },
    {
      id: 'SOL-2025-0147',
      action: 'Rechazó',
      company: 'Imprenta Digital',
      date: '2025-10-19 11:20',
      status: 'rejected',
    },
    {
      id: 'SOL-2025-0146',
      action: 'Asignó',
      company: 'Tech Solutions',
      date: '2025-10-19 09:15',
      status: 'assigned',
    },
    {
      id: 'SOL-2025-0145',
      action: 'Aprobó',
      company: 'Textil Modernos',
      date: '2025-10-18 16:45',
      status: 'approved',
    },
    {
      id: 'SOL-2025-0144',
      action: 'Revisó',
      company: 'Construcciones Roca',
      date: '2025-10-18 13:30',
      status: 'review',
    },
  ]

  const handleSave = () => {
    console.log('Guardando datos:', formData)
    setIsEditing(false)
    alert('Perfil actualizado exitosamente')
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className='w-4 h-4 text-green-600' />
      case 'rejected':
        return <XCircle className='w-4 h-4 text-red-600' />
      case 'assigned':
        return <Clock className='w-4 h-4 text-blue-600' />
      default:
        return <Clock className='w-4 h-4 ' />
    }
  }

  return (
    <div className='min-h-screen '>
      {/* Header */}
      <div className=' border-b border-gray-500/50 shadow-lg'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold '>Mi Perfil</h1>
            <Link href='/' className=' hover:text-gray-500 text-sm'>
              ← Volver al Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Left Column - Profile Card */}
          <div className='lg:col-span-1'>
            <div className=' rounded-xl shadow-sm border border-gray-500/50 dark:bg-base-100 overflow-hidden'>
              {/* Profile Header */}
              <div className='bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white text-center'>
                <div className='w-24 h-24  rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <span className='text-4xl font-bold '>
                    {formData.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <h2 className='text-xl font-bold mb-1'>{formData.fullName}</h2>
                <p className='text-slate-300 text-sm'>{formData.position}</p>
                <div className='mt-4 inline-flex items-center gap-2 /20 backdrop-blur-sm px-3 py-1 rounded-full'>
                  <Shield className='w-4 h-4' />
                  <span className='text-sm'>ID: {formData.employeeId}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className='p-6 border-b border-gray-500/50 dark:bg-base-100'>
                <h3 className='font-semibold  mb-4'>Estadísticas</h3>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-blue-600'>
                      {stats.processed}
                    </p>
                    <p className='text-xs '>Procesadas</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-green-600'>
                      {stats.approved}
                    </p>
                    <p className='text-xs '>Aprobadas</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-red-600'>
                      {stats.rejected}
                    </p>
                    <p className='text-xs '>Rechazadas</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-yellow-600'>
                      {stats.pending}
                    </p>
                    <p className='text-xs '>Pendientes</p>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div className='p-6'>
                <h3 className='font-semibold  mb-4'>Rendimiento</h3>
                <div className='space-y-4'>
                  <div>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-sm '>Tasa de Aprobación</span>
                      <span className='text-sm font-bold '>
                        {stats.approvalRate}%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-green-600 h-2 rounded-full'
                        style={{ width: `${stats.approvalRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between py-3 border-t border-gray-500/50 dark:bg-base-100'>
                    <span className='text-sm '>Tiempo Promedio</span>
                    <span className='text-sm font-bold '>
                      {stats.avgProcessingTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details & Activity */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Personal Information */}
            <div className=' rounded-xl shadow-sm border border-gray-500/50 dark:bg-base-100'>
              <div className='p-6 border-b rounded-xl border-gray-500/50 dark:bg-base-100 flex items-center justify-between'>
                <h3 className='text-lg font-semibold '>Información Personal</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className='flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-gray-500/20 rounded-lg transition-colors'
                  >
                    <Edit2 className='w-4 h-4' />
                    Editar
                  </button>
                ) : (
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={handleCancel}
                      className='flex items-center gap-2 px-4 py-2 hover:bg-gray-500/20  rounded-lg transition-colors'
                    >
                      <X className='w-4 h-4' />
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors'
                    >
                      <Save className='w-4 h-4' />
                      Guardar
                    </button>
                  </div>
                )}
              </div>

              <div className='p-6'>
                <div className='grid md:grid-cols-2 gap-6'>
                  {/* Full Name */}
                  <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-500 mb-2'>
                      <User className='w-4 h-4' />
                      Nombre Completo
                    </label>
                    {isEditing ? (
                      <input
                        type='text'
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    ) : (
                      <p className=''>{formData.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-500 mb-2'>
                      <Mail className='w-4 h-4' />
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type='email'
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    ) : (
                      <p className=''>{formData.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-500 mb-2'>
                      <Phone className='w-4 h-4' />
                      Teléfono
                    </label>
                    {isEditing ? (
                      <input
                        type='tel'
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    ) : (
                      <p className=''>{formData.phone}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-500 mb-2'>
                      <MapPin className='w-4 h-4' />
                      Ubicación
                    </label>
                    {isEditing ? (
                      <input
                        type='text'
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    ) : (
                      <p className=''>{formData.location}</p>
                    )}
                  </div>

                  {/* Position */}
                  <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-500 mb-2'>
                      <Briefcase className='w-4 h-4' />
                      Posición
                    </label>
                    <p className=''>{formData.position}</p>
                  </div>

                  {/* Department */}
                  <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-500 mb-2'>
                      <Award className='w-4 h-4' />
                      Departamento
                    </label>
                    <p className=''>{formData.department}</p>
                  </div>

                  {/* Join Date */}
                  <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-500 mb-2'>
                      <Calendar className='w-4 h-4' />
                      Fecha de Ingreso
                    </label>
                    <p className=''>
                      {new Date(formData.joinDate).toLocaleDateString('es-AR')}
                    </p>
                  </div>

                  {/* Employee ID */}
                  <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-500 mb-2'>
                      <Shield className='w-4 h-4' />
                      ID de Empleado
                    </label>
                    <p className=''>{formData.employeeId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className=' rounded-xl shadow-sm border border-gray-500/50 dark:bg-base-100'>
              <div className='p-6 border-b rounded-xl border-gray-500/50 dark:bg-base-100'>
                <h3 className='text-lg font-semibold '>Actividad Reciente</h3>
              </div>
              <div className='divide-y divide-gray-200'>
                {recentActivity.map((activity, index) => (
                  <div key={index} className='p-4 hover: transition-colors'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3 flex-1'>
                        <div className='flex-shrink-0'>
                          {getStatusIcon(activity.status)}
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium '>
                            {activity.action} solicitud{' '}
                            <span className='text-blue-600'>{activity.id}</span>
                          </p>
                          <p className='text-xs '>{activity.company}</p>
                        </div>
                      </div>
                      <p className='text-xs text-gray-500'>{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='p-4  text-center'>
                <button className='text-sm text-blue-600 hover:text-blue-700 font-medium'>
                  Ver todo el historial
                </button>
              </div>
            </div>

            {/* Achievements */}
            {/* <div className=' rounded-xl shadow-sm border border-gray-500/50 dark:bg-base-100'>
              <div className='p-6 border-b border-gray-500/50 dark:bg-base-100'>
                <h3 className='text-lg font-semibold '>Logros</h3>
              </div>
              <div className='p-6'>
                <div className='grid md:grid-cols-3 gap-4'>
                  <div className='text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200'>
                    <div className='text-4xl mb-2'>🏆</div>
                    <p className='text-sm font-semibold '>Top Performer</p>
                    <p className='text-xs '>Octubre 2025</p>
                  </div>
                  <div className='text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200'>
                    <div className='text-4xl mb-2'>⚡</div>
                    <p className='text-sm font-semibold '>
                      Procesamiento Rápido
                    </p>
                    <p className='text-xs '>100+ solicitudes</p>
                  </div>
                  <div className='text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200'>
                    <div className='text-4xl mb-2'>✨</div>
                    <p className='text-sm font-semibold '>Alta Precisión</p>
                    <p className='text-xs '>95% de acierto</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OperatorProfile
