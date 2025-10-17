import React from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from 'react-hook-form'
import { FormDataSignUp } from './SignUpForm'

export default function ThirdStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const legalErrors = errors?.legalInfo as Merge<
    FieldError,
    FieldErrorsImpl<FormDataSignUp['legalInfo']>
  >
  return (
    <div className='space-y-5'>
      <h2 className='text-2xl font-bold  mb-6'>
        Información Legal y Financiera
      </h2>

      <div>
        <label className='block text-sm font-medium  mb-2'>
          Dirección Fiscal *
        </label>
        <input
          type='text'
          {...register('legalInfo.address', {
            required: 'La dirección es requerida',
            minLength: { value: 5, message: 'Dirección muy corta' },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            legalErrors?.address ? 'border-red-500' : 'border-gray-500'
          }`}
          placeholder='Av. Corrientes 1234, Piso 5, Oficina B'
        />
        {legalErrors?.address && (
          <p className='mt-1 text-sm text-red-600'>
            {legalErrors?.address.message}
          </p>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div>
          <label className='block text-sm font-medium  mb-2'>Ciudad *</label>
          <input
            type='text'
            {...register('legalInfo.city', {
              required: 'La ciudad es requerida',
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              legalErrors?.city ? 'border-red-500' : 'border-gray-500'
            }`}
            placeholder='Buenos Aires'
          />
          {legalErrors?.city && (
            <p className='mt-1 text-sm text-red-600'>
              {legalErrors?.city.message}
            </p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium  mb-2'>Provincia *</label>
          <select
            {...register('legalInfo.province', {
              required: 'Selecciona una provincia',
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              legalErrors?.province ? 'border-red-500' : 'border-gray-500'
            }`}
          >
            <option value=''>Seleccionar...</option>
            <option value='CABA'>CABA</option>
            <option value='Buenos Aires'>Buenos Aires</option>
            <option value='Córdoba'>Córdoba</option>
            <option value='Santa Fe'>Santa Fe</option>
            <option value='Mendoza'>Mendoza</option>
            <option value='Tucumán'>Tucumán</option>
          </select>
          {legalErrors?.province && (
            <p className='mt-1 text-sm text-red-600'>
              {legalErrors?.province.message}
            </p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium  mb-2'>
            Código Postal *
          </label>
          <input
            type='text'
            {...register('legalInfo.zipCode', {
              required: 'El código postal es requerido',
              pattern: {
                value: /^[0-9]{4}$/,
                message: 'Formato: 4 dígitos',
              },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              legalErrors?.zipCode ? 'border-red-500' : 'border-gray-500'
            }`}
            placeholder='1234'
          />
          {legalErrors?.zipCode && (
            <p className='mt-1 text-sm text-red-600'>
              {legalErrors?.zipCode.message}
            </p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <label className='block text-sm font-medium  mb-2'>
            Cantidad de Empleados *
          </label>
          <select
            {...register('legalInfo.employees', {
              required: 'Selecciona una opción',
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              legalErrors?.employees ? 'border-red-500' : 'border-gray-500'
            }`}
          >
            <option value=''>Seleccionar...</option>
            <option value='1-5'>1-5 empleados</option>
            <option value='6-10'>6-10 empleados</option>
            <option value='11-25'>11-25 empleados</option>
            <option value='26-50'>26-50 empleados</option>
            <option value='51-100'>51-100 empleados</option>
            <option value='100+'>Más de 100</option>
          </select>
          {legalErrors?.employees && (
            <p className='mt-1 text-sm text-red-600'>
              {legalErrors?.employees.message}
            </p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium  mb-2'>
            Facturación Anual Estimada *
          </label>
          <select
            {...register('legalInfo.estimatedAnnualBilling', {
              required: 'Selecciona una opción',
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              legalErrors?.estimatedAnnualBilling
                ? 'border-red-500'
                : 'border-gray-500'
            }`}
          >
            <option value=''>Seleccionar...</option>
            <option value='0-500k'>Hasta $500.000</option>
            <option value='500k-1M'>$500.000 - $1.000.000</option>
            <option value='1M-5M'>$1.000.000 - $5.000.000</option>
            <option value='5M-10M'>$5.000.000 - $10.000.000</option>
            <option value='10M+'>Más de $10.000.000</option>
          </select>
          {legalErrors?.estimatedAnnualBilling && (
            <p className='mt-1 text-sm text-red-600'>
              {legalErrors?.estimatedAnnualBilling.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium  mb-2'>
          Descripción de la Actividad
        </label>
        <textarea
          {...register('legalInfo.activityDescription')}
          rows={4}
          className='w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='Describe brevemente la actividad principal de tu empresa...'
        ></textarea>
      </div>
    </div>
  )
}
