import React from 'react'

export default function WhatsAppButton() {
  return (
    <a
      href='https://wa.me/5491112345678'
      target='_blank'
      rel='noopener noreferrer'
      className='fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-all hover:scale-110 z-50'
    >
      <span className='text-3xl'>💬</span>
    </a>
  )
}
