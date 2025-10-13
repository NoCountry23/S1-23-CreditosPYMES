import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function FourthStep() {
  const { getValues } = useFormContext()
  return (
    <div className='flex flex-col gap-4 '>
      <p>Revision</p>
      <p>Verifica que toda la informacion este correcta</p>
      <div>
        <p>Empresa: {getValues('companyName')}</p>
        <p>Info financiera: {getValues('financialInfo')}</p>
        <p>Monto: {getValues('amount')}</p>
      </div>
      <button type={'submit'} className='btn ml-auto'>
        Enviar
      </button>
    </div>
  )
}
