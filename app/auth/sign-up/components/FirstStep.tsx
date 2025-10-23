import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from "react-hook-form";
import { FormDataSignUp } from "./SignUpForm";

export default function FirstStep() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  const userErrors = errors?.user as Merge<
    FieldError,
    FieldErrorsImpl<FormDataSignUp["user"]>
  >;
  const password = watch("user.password");

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold  mb-6">Datos de Acceso</h2>

      <div>
        <label className="block text-sm font-medium  mb-2">Nombre *</label>
        <input
          type="text"
          {...register("user.firstName", {
            required: "El nombre es requerido",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            userErrors?.firstName ? "border-red-500" : "border-gray-500"
          }`}
          placeholder="Juan"
        />
        {userErrors?.firstName && (
          <p className="mt-1 text-sm text-red-600">
            {userErrors?.firstName.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium  mb-2">Apellido *</label>
        <input
          type="text"
          {...register("user.lastName", {
            required: "El nombre es requerido",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            userErrors?.lastName ? "border-red-500" : "border-gray-500"
          }`}
          placeholder="Pérez"
        />
        {userErrors?.lastName && (
          <p className="mt-1 text-sm text-red-600">
            {userErrors?.lastName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium  mb-2">Email *</label>
        <input
          type="email"
          {...register("user.email", {
            required: "El email es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            userErrors?.email ? "border-red-500" : "border-gray-500"
          }`}
          placeholder="contacto@miempresa.com"
        />
        {userErrors?.email && (
          <p className="mt-1 text-sm text-red-600">
            {userErrors?.email.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium  mb-2">
            Contraseña *
          </label>
          <input
            type="password"
            {...register("user.password", {
              required: "La contraseña es requerida",
              minLength: { value: 8, message: "Mínimo 8 caracteres" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: "Debe incluir mayúscula, minúscula y número",
              },
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              userErrors?.password ? "border-red-500" : "border-gray-500"
            }`}
            placeholder="••••••••"
          />
          {userErrors?.password && (
            <p className="mt-1 text-sm text-red-600">
              {userErrors?.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium  mb-2">
            Confirmar Contraseña *
          </label>
          <input
            type="password"
            {...register("user.confirmPassword", {
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              userErrors?.confirmPassword ? "border-red-500" : "border-gray-500"
            }`}
            placeholder="••••••••"
          />
          {userErrors?.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {userErrors?.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* <div>
        <label className='block text-sm font-medium  mb-2'>
          Teléfono de Contacto *
        </label>
        <input
          type='tel'
          {...register('user.phone', {
            required: 'El teléfono es requerido',
            pattern: {
              value:
                /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
              message: 'Teléfono inválido',
            },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            userErrors?.phone ? 'border-red-500' : 'border-gray-500'
          }`}
          placeholder='+54 11 1234-5678'
        />
        {userErrors?.phone && (
          <p className='mt-1 text-sm text-red-600'>
            {userErrors?.phone.message}
          </p>
        )}
      </div> */}
    </div>
  );
}
