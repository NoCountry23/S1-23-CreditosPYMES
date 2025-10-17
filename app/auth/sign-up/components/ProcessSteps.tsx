import { CheckCircle, LucideProps } from 'lucide-react'
import React, { Fragment } from 'react'

export default function ProcessSteps({
  steps,
  currentStep,
}: {
  steps: {
    number: number
    title: string
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >
  }[]

  currentStep: number
}) {
  return (
    <div className='mb-8 w-full'>
      <div className='flex items-center justify-between'>
        {steps.map((step, index) => (
          <Fragment key={step.number}>
            <div className='flex flex-col items-center flex-1'>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  currentStep > step.number
                    ? 'bg-green-500 '
                    : currentStep === step.number
                    ? 'bg-blue-600 '
                    : 'bg-gray-500 '
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle className='w-6 h-6' />
                ) : (
                  <step.icon className='w-6 h-6' />
                )}
              </div>
              <p
                className={`mt-2 text-xs text-center font-medium hidden md:block ${
                  currentStep >= step.number ? 'text-gray-500' : ''
                }`}
              >
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 rounded transition-all ${
                  currentStep > step.number ? 'bg-green-500' : 'bg-gray-500'
                }`}
              ></div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
