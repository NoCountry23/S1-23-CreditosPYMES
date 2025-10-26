import {
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2Icon,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function FourthStep({
  handleFileUpload,
  uploadedFiles,
  loading,
  handlePrevious,
}: {
  handleFileUpload: (fieldName: string, file: File) => void
  uploadedFiles: {
    [key: string]: File | null
  }
  loading: boolean
  handlePrevious: () => void
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className='space-y-5'>
      <h2 className='text-2xl font-bold  mb-2'>Documentación</h2>
      <p className='text-gray-600 mb-6'>
        Sube los documentos requeridos. Formatos aceptados: PDF, JPG, PNG (máx.
        10MB cada uno)
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
        {/* DNI */}
        <div className='border-2 border-dashed border-gray-500/50 rounded-lg p-6 hover:border-blue-500 transition-all'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0'>
              <FileText className='w-6 h-6 text-blue-600' />
            </div>
            <div className='flex-1'>
              <h3 className='font-semibold  mb-1'>
                DNI del Representante Legal
              </h3>
              <p className='text-sm text-gray-600 mb-3'>
                Frente del DNI del titular o representante legal
              </p>
              <input
                type='file'
                accept='.pdf,.jpg,.jpeg,.png'
                onChange={(e) =>
                  e.target.files && handleFileUpload("dni", e.target.files[0])
                }
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              />
              {uploadedFiles.dni && (
                <div className='mt-2 flex items-center gap-2 text-sm text-green-600'>
                  <CheckCircle className='w-4 h-4' />
                  archivo cargado
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Constancia AFIP */}
        <div className='border-2 border-dashed border-gray-500/50 rounded-lg p-6 hover:border-blue-500 transition-all'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0'>
              <FileText className='w-6 h-6 text-green-600' />
            </div>
            <div className='flex-1'>
              <h3 className='font-semibold  mb-1'>
                Constancia de Inscripción AFIP
              </h3>
              <p className='text-sm text-gray-600 mb-3'>
                Constancia de inscripción ante AFIP actualizada
              </p>
              <input
                type='file'
                accept='.pdf,.jpg,.jpeg,.png'
                onChange={(e) =>
                  e.target.files && handleFileUpload("afip", e.target.files[0])
                }
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100'
              />
              {uploadedFiles.afip && (
                <div className='mt-2 flex items-center gap-2 text-sm text-green-600'>
                  <CheckCircle className='w-4 h-4' />
                  Archivo cargado
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Estado de resultados */}
        <div className='border-2 border-dashed border-gray-500/50 rounded-lg p-6 hover:border-blue-500 transition-all'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0'>
              <FileText className='w-6 h-6 text-purple-600' />
            </div>
            <div className='flex-1'>
              <h3 className='font-semibold  mb-1'>Estado de resultados</h3>
              <p className='text-sm text-gray-600 mb-3'>
                Estado de resultados de la empresa actualizada
              </p>
              <input
                type='file'
                accept='.pdf,.jpg,.jpeg,.png'
                onChange={(e) =>
                  e.target.files &&
                  handleFileUpload("resultsStatus", e.target.files[0])
                }
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100'
              />
              {uploadedFiles.resultsStatus && (
                <div className='mt-2 flex items-center gap-2 text-sm text-green-600'>
                  <CheckCircle className='w-4 h-4' />
                  archivo cargado
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className='border-2 border-dashed border-gray-500/50 rounded-lg p-6 hover:border-blue-500 transition-all'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0'>
              <FileText className='w-6 h-6 text-orange-600' />
            </div>
            <div className='flex-1'>
              <h3 className='font-semibold  mb-1'>Balance</h3>
              <p className='text-sm text-gray-600 mb-3'>
                Balance de la empresa actualizada
              </p>
              <input
                type='file'
                accept='.pdf,.jpg,.jpeg,.png'
                onChange={(e) =>
                  e.target.files &&
                  handleFileUpload("balance", e.target.files[0])
                }
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100'
              />
              {uploadedFiles.balance && (
                <div className='mt-2 flex items-center gap-2 text-sm text-green-600'>
                  <CheckCircle className='w-4 h-4' />
                  archivo cargado
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Estatuto/Contrato Social (Optional) */}
        <div className='border-2 border-dashed border-gray-500/50 rounded-lg p-6 hover:border-blue-500 transition-all '>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
              <FileText className='w-6 h-6 text-gray-600' />
            </div>
            <div className='flex-1'>
              <h3 className='font-semibold  mb-1'>
                Estatuto o Contrato Social
                <span className='ml-2 text-xs text-gray-500 font-normal'>
                  (Opcional)
                </span>
              </h3>
              <p className='text-sm text-gray-600 mb-3'>
                Documentación legal de constitución de la empresa
              </p>
              <input
                type='file'
                accept='.pdf,.jpg,.jpeg,.png'
                onChange={(e) =>
                  e.target.files &&
                  handleFileUpload("statute", e.target.files[0])
                }
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold   hover:file:bg-gray-500/50'
              />
              {uploadedFiles.statute && (
                <div className='mt-2 flex items-center gap-2 text-sm text-green-600'>
                  <CheckCircle className='w-4 h-4' />
                  Archivo cargado
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className=' border border-blue-200 rounded-lg p-4 mt-6'>
        <label className='flex items-start gap-3 cursor-pointer'>
          <input
            type='checkbox'
            {...register("acceptTerms", {
              required: "Debes aceptar los términos y condiciones",
            })}
            className='mt-1 rounded border-gray-500/50 text-blue-600 focus:ring-blue-500'
          />
          <span className='text-sm '>
            Acepto los{" "}
            <a
              href='#'
              className='text-blue-600 hover:text-blue-700 font-medium'
            >
              términos y condiciones
            </a>{" "}
            y autorizo a FinanciaPYME a consultar mis datos en las centrales de
            riesgo crediticio
          </span>
        </label>
        {errors?.acceptTerms && (
          <p className='mt-2 text-sm text-red-600 ml-7'>
            {errors?.acceptTerms?.message as string}
          </p>
        )}
      </div>

      <div className='bg-yellow-500/10 border border-yellow-200 rounded-lg p-4 flex items-start gap-3'>
        <AlertCircle className='w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5' />
        <div className='text-sm text-yellow-500'>
          <p className='font-medium mb-1'>Información importante</p>
          <p>
            Una vez completado el registro, nuestro equipo revisará tu solicitud
            en un plazo de 24-48 horas hábiles. Recibirás un email con el estado
            de tu cuenta.
          </p>
        </div>
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
          type='submit'
          className='flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700  rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium shadow-lg hover:shadow-xl'
        >
          {loading ? (
            <Loader2Icon className='w-5 h-5 animate-spin' />
          ) : (
            <>
              <CheckCircle className='w-5 h-5' />
              Completar Registro
            </>
          )}
        </button>
      </div>
    </div>
  );
}
