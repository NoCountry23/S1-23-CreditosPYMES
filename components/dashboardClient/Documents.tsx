import { FileText, Eye, Download } from 'lucide-react'
import React from 'react'
const documents = [
  {
    name: 'Contrato de Préstamo',
    date: '2025-05-01',
    type: 'PDF',
    size: '2.4 MB',
  },
  { name: 'Plan de Pagos', date: '2025-05-01', type: 'PDF', size: '580 KB' },
  {
    name: 'Estado de Cuenta - Oct',
    date: '2025-10-01',
    type: 'PDF',
    size: '320 KB',
  },
  {
    name: 'Términos y Condiciones',
    date: '2025-05-01',
    type: 'PDF',
    size: '1.1 MB',
  },
]
export default function Documents() {
  return (
    <div className=' rounded-xl shadow-sm border border-gray-500'>
      <div className='p-6 border-b border-gray-500'>
        <h3 className='text-lg font-semibold '>Documentos</h3>
      </div>
      <div className='p-6'>
        <div className='space-y-3'>
          {documents.map((doc, index) => (
            <div
              key={index}
              className='flex items-center justify-between p-4  rounded-lg  transition-colors'
            >
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center'>
                  <FileText className='w-5 h-5 text-red-600' />
                </div>
                <div>
                  <p className='font-medium '>{doc.name}</p>
                  <p className='text-sm '>
                    {doc.date} • {doc.size}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <button className='p-2 hover:bg-slate-500/20 rounded-lg transition-colors'>
                  <Eye className='w-5 h-5 ' />
                </button>
                <button className='p-2 hover:bg-slate-500/20 rounded-lg transition-colors'>
                  <Download className='w-5 h-5 ' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
