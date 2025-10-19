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
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent  hover:text-gray-700'
            }`}
          >
            Vista General
          </button>
          <button
            onClick={() => setActiveTab('loans')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'loans'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent  hover:text-gray-700'
            }`}
          >
            Mis Préstamos
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'payments'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent  hover:text-gray-700'
            }`}
          >
            Pagos
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'documents'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent  hover:text-gray-700'
            }`}
          >
            Documentos
          </button>
        </nav>
      </div>
    </div>
  )
}
