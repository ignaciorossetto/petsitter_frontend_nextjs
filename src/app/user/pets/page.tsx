"use client"
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import PetDashboard from '@/components/PetDashboard'
import { UserContext, UserContextType } from '@/hooks/auth/authContext'
import Link from 'next/link'
import React, { Suspense, useContext } from 'react'

const Pets = () => {
  const { user } = useContext<UserContextType>(UserContext) 

  return (
    <Suspense>
      <NavBar />
      {
        user && user.confirmedAccount && user.fullAddress?.address &&
          <PetDashboard /> 
      }
      {
        !user && <PetDashboard /> 
      }
      {
        user && user.confirmedAccount && !user.fullAddress?.address &&
        <div
            className='min-h-[500px]  flex justify-center items-center p-5 bg-white/25 shadow-2xl'
          >
            
            <span
              className='w-[550px] text-[20px] -mt-32'
            >
            Los usuarios registrador por google
            deben configurar su domicilio en el 
              
            <Link
              href={'/user'}
              className='font-bold underline mx-2 text-[22px]'
              >PANEL DE CUENTA
            </Link> 
            para poder acceder a todas las funciones de Pimi!
              </span>
        </div>
      }
      {
        user && !user.confirmedAccount &&

        <div
            className='min-h-[500px]  flex justify-center items-center p-5 bg-white/25 shadow-2xl'
          >
            
            <div
              className='flex flex-col gap-3 text-[20px] -mt-32'
            >
              <div
                className=''
              >
                Debes confirmar la cuenta para acceder a las funciones de Pimi!
              </div>
              <div
              className=''
              >
                Si no pudiste confirmar tu mail
                <Link
                  href={`error?code=3`}
                  className='text-[22px] underline font-bold ml-2'
                >
                  Haz click AQUI</Link>
              </div>
              </div>
        </div>

      }
        <Footer/>
    </Suspense>
  )
}

export default Pets