import React from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from 'react-hook-form'
import { FormDataSignUp } from './SignUpForm'

export default function SecondStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const companyErrors = errors?.company as Merge<
    FieldError,
    FieldErrorsImpl<FormDataSignUp['company']>
  >
  return (
    <div className='space-y-5'>
      <h2 className='text-2xl font-bold  mb-6'>Datos de la Empresa</h2>

      <div>
        <label className='block text-sm font-medium  mb-2'>
          Razón Social *
        </label>
        <input
          type='text'
          {...register('company.companyName', {
            required: 'La razón social es requerida',
            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            companyErrors?.companyName ? 'border-red-500' : 'border-gray-500'
          }`}
          placeholder='Mi Empresa S.R.L.'
        />
        {companyErrors?.companyName && (
          <p className='mt-1 text-sm text-red-600'>
            {companyErrors?.companyName.message}
          </p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium  mb-2'>
          Nombre Comercial / Fantasía
        </label>
        <input
          type='text'
          {...register('company.tradeName')}
          className='w-full px-4 py-3 border border-gray-500/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='Mi Empresa'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <label className='block text-sm font-medium  mb-2'>CUIT *</label>
          <input
            type='text'
            {...register('company.cuit', {
              required: 'El CUIT es requerido',
              pattern: {
                value: /^\d{2}-\d{8}-\d{1}$/,
                message: 'Formato: XX-XXXXXXXX-X',
              },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              companyErrors?.cuit ? 'border-red-500' : 'border-gray-500'
            }`}
            placeholder='30-12345678-9'
          />
          {companyErrors?.cuit && (
            <p className='mt-1 text-sm text-red-600'>
              {companyErrors?.cuit.message}
            </p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium  mb-2'>
            Rubro / Industria *
          </label>
          <select
            {...register('company.industry', {
              required: 'Selecciona un rubro',
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              companyErrors?.industry ? 'border-red-500' : 'border-gray-500'
            }`}
          >
            <option value=''>Seleccionar...</option>
            <option value='comercio'>Comercio</option>
            <option value='servicios'>Servicios</option>
            <option value='industria'>Industria</option>
            <option value='tecnologia'>Tecnología</option>
            <option value='construccion'>Construcción</option>
            <option value='gastronomia'>Gastronomía</option>
            <option value='logistica'>Logística</option>
            <option value='automotriz'>Automotriz</option>
            <option value='salud'>Salud</option>
            <option value='otro'>Otro</option>
          </select>
          {companyErrors?.industry && (
            <p className='mt-1 text-sm text-red-600'>
              {companyErrors?.industry.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium  mb-2'>
          Años en el Mercado *
        </label>
        <input
          type='number'
          {...register('company.yearsInBusiness', {
            required: 'Este campo es requerido',
            min: { value: 0, message: 'Debe ser un número positivo' },
            max: { value: 100, message: 'Valor no válido' },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            companyErrors?.yearsInBusiness
              ? 'border-red-500'
              : 'border-gray-500'
          }`}
          placeholder='5'
        />
        {companyErrors?.yearsInBusiness && (
          <p className='mt-1 text-sm text-red-600'>
            {companyErrors?.yearsInBusiness.message}
          </p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium  mb-2'>Sitio Web</label>
        <input
          type='url'
          {...register('company.website', {
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'URL inválida (incluye http:// o https://)',
            },
          })}
          className='w-full px-4 py-3 border border-gray-500/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='https://www.miempresa.com'
        />
        {companyErrors?.website && (
          <p className='mt-1 text-sm text-red-600'>
            {companyErrors?.website.message}
          </p>
        )}
      </div>
    </div>
  )
}
