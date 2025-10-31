import React from "react";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from "react-hook-form";
import { FormDataSignUp } from "./SignUpForm";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CountryData } from "@/app/types/phone";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

// interface CountryData {
//   dialCode: string;
//   countryCode: string;
//   name: string;
// }

export default function SecondStep({
  handleNext,
  handlePrevious,
}: {
  handleNext: () => void
  handlePrevious: () => void
}) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const companyErrors = errors?.company as Merge<
    FieldError,
    FieldErrorsImpl<FormDataSignUp["company"]>
  >;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePhoneChange = (value: string, country: object, field: any) => {
    const countryData = country as CountryData;

    if (countryData?.dialCode && value.length > countryData.dialCode.length) {
      const phoneNumber = value.slice(countryData.dialCode.length);
      const finalValue = `+${countryData.dialCode}-${phoneNumber}`;

      field.onChange(finalValue);
    } else {
      field.onChange(value);
    }
  };

  return (
    <div className='space-y-5'>
      <h2 className='text-2xl font-bold  mb-6'>Datos de la Empresa</h2>

      <div>
        <label className='block text-sm font-medium  mb-2'>
          Razón Social *
        </label>
        <input
          type='text'
          {...register("company.companyName", {
            required: "La razón social es requerida",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
          className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500 ${
            companyErrors?.companyName ? "border-red-500" : "border-gray-500"
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
          Email de la empresa *
        </label>
        <input
          type='text'
          {...register("company.email", {
            required: "La razón social es requerida",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Formato de email incorrecto",
            },
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
          className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500 ${
            companyErrors?.email ? "border-red-500" : "border-gray-500"
          }`}
          placeholder='hCQlO@example.com'
        />
        {companyErrors?.email && (
          <p className='mt-1 text-sm text-red-600'>
            {companyErrors?.email.message}
          </p>
        )}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <label className='block text-sm font-medium  mb-2'>CUIT *</label>
          <input
            type='text'
            {...register("company.cuit", {
              required: "El CUIT es requerido",
              pattern: {
                value: /^\d{2}-\d{8}-\d{1}$/,
                message: "Formato: XX-XXXXXXXX-X",
              },
            })}
            className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500 ${
              companyErrors?.cuit ? "border-red-500" : "border-gray-500"
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
            {...register("company.industry", {
              required: "Selecciona un rubro",
            })}
            className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500 ${
              companyErrors?.industry ? "border-red-500" : "border-gray-500"
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
          {...register("company.yearsInBusiness", {
            required: "Este campo es requerido",
            min: { value: 0, message: "Debe ser un número positivo" },
            max: { value: 100, message: "Valor no válido" },
          })}
          className={`w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500  ${
            companyErrors?.yearsInBusiness
              ? "border-red-500"
              : "border-gray-500"
          }`}
          placeholder='5'
        />
        {companyErrors?.yearsInBusiness && (
          <p className='mt-1 text-sm text-red-600'>
            {companyErrors?.yearsInBusiness.message}
          </p>
        )}
      </div>

      {/* Campo de Teléfono */}
      <div className='w-full'>
        <label className='block text-sm font-medium mb-2'>
          Teléfono de Contacto *
        </label>
        <Controller
          name='company.phone'
          control={control}
          rules={{
            required: "El teléfono es requerido",
            validate: (value) => {
              if (!value) return true;
              const phoneRegex = /^\+\d{1,4}-\d{6,14}$/;
              return phoneRegex.test(value) || "Formato de teléfono inválido";
            },
          }}
          render={({ field }) => (
            <div
              className={`
        relative border border-gray-500/50 rounded-lg
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent
        ${companyErrors?.phone ? "border-red-500" : ""}
        transition-all duration-200
      `}
            >
              <PhoneInput
                country='ar'
                onlyCountries={[
                  "ar",
                  "br",
                  "cl",
                  "uy",
                  "py",
                  "bo",
                  "pe",
                  "ec",
                  "co",
                  "ve",
                  "mx",
                  "es",
                  "us",
                ]}
                preferredCountries={["ar", "br", "cl", "uy"]}
                enableSearch={true}
                countryCodeEditable={false}
                searchPlaceholder='Buscar país...'
                placeholder='11 1234-5678'
                value={
                  field.value
                    ? field.value.replace("+", "").replace("-", "")
                    : ""
                }
                onChange={(value, country) =>
                  handlePhoneChange(value, country, field)
                }
                inputStyle={{
                  width: "100%",
                  padding: "24px 16px 24px 60px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  backgroundColor: "hsl(var(--input))",
                  outline: "none",
                }}
                buttonStyle={{
                  border: "none",
                  backgroundColor: "transparent",
                  padding: "0 12px",
                  height: "100%",
                }}
                containerStyle={{
                  border: "none",
                }}
              />
            </div>
          )}
        />
        {companyErrors?.phone && (
          <p className='mt-1 text-sm text-red-600'>
            {companyErrors.phone.message}
          </p>
        )}
      </div>

      {/* Campo Sitio Web */}
      <div>
        <label className='block text-sm font-medium  mb-2'>Sitio Web *</label>
        <input
          type='url'
          {...register("company.website", {
            pattern: {
              value: /^https?:\/\/.+/,
              message: "URL inválida (incluye http:// o https://)",
            },
          })}
          className='w-full px-4 py-3 outline-none border border-gray-500/50 bg-input rounded-lg focus:ring-2 focus:ring-blue-500'
          placeholder='https://www.miempresa.com'
        />
        {companyErrors?.website && (
          <p className='mt-1 text-sm text-red-600'>
            {companyErrors?.website.message}
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
