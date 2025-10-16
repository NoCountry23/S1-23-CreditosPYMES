import Link from 'next/link'
import React from 'react'
import { hasEnvVars } from '@/lib/utils'
import { AuthButton } from './auth-button'
import { EnvVarWarning } from './env-var-warning'
import { Box } from 'lucide-react'
import MenuHeaderMobile from './MenuHeaderMobile'

export default function Header() {
  return (
    <header className='relative'>
      <div className='navbar bg-background shadow-sm px-5 md:px-16 py-4'>
        <div className='navbar-start'>
          <div>
            <Link href='/' className='btn btn-ghost text-xl'>
              Logo
            </Link>
          </div>
          <div className='hidden md:flex w-full'>
            <ul className='menu menu-horizontal px-1 w-full'>
              <li>
                <Link href={'/prestamos'}>Prestamos</Link>
              </li>
              <li>
                <Link href={'/servicios'}>Servicios</Link>
              </li>
              <li>
                <Link href={'/ayuda'}>Ayuda</Link>
              </li>
              <li className='static'>
                <details className='static'>
                  <summary>Más</summary>
                  <div
                    className={`overflow-hidden  absolute top-full bg-background shadow-md rounded-md w-full px-16 left-0 z-10`}
                  >
                    <ul className='menu menu-vertical gap-6'>
                      <li>Recursos</li>
                      <li>
                        <div>
                          <Box className='' />
                          <div>
                            <b>Blog</b>
                            <p>Consejos para tu negocio</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div>
                          <Box className='' />
                          <div>
                            <b>Guías</b>
                            <p>Información util para emprendedores</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div>
                          <Box className='' />
                          <div>
                            <b>Casos de éxito</b>
                            <p>Historias reales de nuestros clientes</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div>
                          <Box className='' />
                          <div>
                            <b>Webinars</b>
                            <p>Aprende con expertos en financiamiento</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </details>
              </li>
            </ul>
          </div>
        </div>
        <div className='navbar-end hidden md:flex'>
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>
        <MenuHeaderMobile />
      </div>
    </header>
  )
}
