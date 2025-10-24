import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from "react-hook-form";
import { FormDataSignUp } from "./SignUpForm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ThirdStep({
  handleNext,
  handlePrevious,
}: {
  handleNext: () => void
  handlePrevious: () => void
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const legalErrors = errors?.legalInfo as Merge<
    FieldError,
    FieldErrorsImpl<FormDataSignUp["legalInfo"]>
  >;

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
          {...register("legalInfo.address", {
            required: "La dirección es requerida",
            minLength: { value: 5, message: "Dirección muy corta" },
          })}
          className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500 ${
            legalErrors?.address ? "border-red-500" : "border-gray-500"
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
            {...register("legalInfo.city", {
              required: "La ciudad es requerida",
            })}
            className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500 ${
              legalErrors?.city ? "border-red-500" : "border-gray-500"
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
            {...register("legalInfo.province", {
              required: "Selecciona una provincia",
            })}
            className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500 ${
              legalErrors?.province ? "border-red-500" : "border-gray-500"
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
            {...register("legalInfo.zipCode", {
              required: "El código postal es requerido",
              pattern: {
                value: /^[0-9]{4}$/,
                message: "Formato: 4 dígitos",
              },
            })}
            className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500 ${
              legalErrors?.zipCode ? "border-red-500" : "border-gray-500"
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
          <input
            type='text'
            {...register("legalInfo.employees", {
              required: "La cantidad de empleados es requerida",
            })}
            className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500 ${
              legalErrors?.employees ? "border-red-500" : "border-gray-500"
            }`}
            placeholder='10'
          />
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
          <Controller
            name='legalInfo.estimatedAnnualBilling'
            control={control}
            rules={{
              required: "La facturación anual estimada es obligatoria",
            }}
            render={({ field }) => (
              <input
                {...field}
                className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  legalErrors?.estimatedAnnualBilling
                    ? "border-red-500"
                    : "border-gray-500"
                }`}
                value={Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",

                  minimumFractionDigits: 0,
                }).format(Number(field.value || 0))}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(raw);
                }}
              />
            )}
          />

          {legalErrors?.estimatedAnnualBilling && (
            <p className='mt-1 text-sm text-red-600'>
              {legalErrors?.estimatedAnnualBilling.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium  mb-2'>
          Descripción de la Actividad *
        </label>
        <textarea
          {...register("legalInfo.activityDescription", {
            required: "La descripción de la actividad es requerida",
          })}
          rows={4}
          className='w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500'
          placeholder='Describe brevemente la actividad principal de tu empresa...'
        ></textarea>

        {legalErrors?.activityDescription && (
          <p className='mt-1 text-sm text-red-600'>
            {legalErrors?.activityDescription.message}
          </p>
        )}
      </div>
      <div className='flex justify-between flex-col lg:flex-row '>
        <button
          type='button'
          onClick={handlePrevious}
          className='flex items-center border border-slate-500/50 justify-center gap-2 px-6 py-3  text-gray rounded-lg hover:text-gray-500 transition-all font-medium'
        >
          <ArrowLeft className='w-4 h-4' />
          Anterior
        </button>

        <div className='flex items-center justify-center gap-3'>
          <Link
            href='/auth/login'
            className='px-6 py-3 text-gray-600 hover:text-gray-800 transition-all'
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>

        <button
          type='button'
          onClick={handleNext}
          className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700  rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg hover:shadow-xl'
        >
          Siguiente
          <ArrowRight className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
}
