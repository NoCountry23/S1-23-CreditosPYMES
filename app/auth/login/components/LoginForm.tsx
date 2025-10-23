"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Mail,
  AlertCircle,
  EyeOff,
  Eye,
  Lock,
  Loader2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
interface FormDataLogin {
  email: string;
  password: string;
}
export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>();

  const onSubmit = useMutation({
    mutationFn: async (data: FormDataLogin) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error al iniciar sesión", {
          cause: await response.json().then((res) => res.error),
        });
      }
      return await response.json();
    },
    onSuccess: () => {
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.log(error.cause, "error");
    },
  });
  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit.mutate(data))}
      className="space-y-5"
    >
      {onSubmit.isError && (
        <div role="alert" className="alert alert-error alert-outline">
          <AlertCircle className="w-6 h-6" />
          <span>{onSubmit.error.cause as string}</span>
        </div>
      )}
      {/* Email */}
      <div>
        <label className="block text-sm font-medium  mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5" />
          <input
            type="text"
            {...register("email", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.email ? "border-red-500" : "border-gray-500"
            }`}
            placeholder="tu@empresa.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium  mb-2">Contraseña</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
            })}
            className={`w-full pl-11 pr-11 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.password ? "border-red-500" : "border-gray-500"
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2  hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between">
        <a
          href="/auth/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700  py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
      >
        {onSubmit.isPending ? (
          <Loader2Icon className="  animate-spin" />
        ) : (
          "Iniciar Sesión"
        )}
      </button>
    </form>
  );
}
