import React from 'react'

export default function NavigationTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  return (
    <div className=' border-b border-gray-500'>
      <div className='px-6'>
        <nav className='flex gap-8'>
          <button
            onClick={() => setActiveTab('requests-unassigned')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'requests-unassigned'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent  hover:text-gray-700'
            }`}
          >
            Solicitudes Sin Asignar
          </button>
          <button
            onClick={() => setActiveTab('my-requests-assigned')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'my-requests-assigned'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent  hover:text-gray-700'
            }`}
          >
            Mis Solicitudes Asignadas
          </button>
        </nav>
      </div>
    </div>
  )
}
