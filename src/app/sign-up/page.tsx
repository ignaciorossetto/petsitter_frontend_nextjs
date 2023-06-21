"use client"
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { useState } from 'react'

interface Form {
  username: string,
  password: string,
  email: string,
  fullAddress: string,
  type?: string,
  newsCheckBox?: boolean,
  admin?: boolean,
  profileImg: string,
  strategy: string,

}

const SignUpView = () => {
  const [signUpForm, setSignUpForm] = useState({

  })


  return (
    <>
    <NavBar/>
    <section className='flex flex-col items-center w-full bg-[url("/gradient.png")] bg-cover rounded-2xl min-h-[60vh] shadow-2xl'>
      <form className='flex flex-col gap-3 p-5 items-center sm:w-96'>
      <h1 className='text-5xl mb-2 text-center font-medium pt-5'>Registro</h1>
      <label className='font-medium w-full sm:w-96 self-start text-lg '>Nombre completo</label>
      <input className='p-2 w-full sm:w-96  text-lg' name='' type='text' placeholder='' />
      <label className='font-medium self-start text-lg '>Contraseña</label>
      <input className='p-2 w-full sm:w-96  text-lg' name='' type='password' placeholder='' />
      <label className='font-medium self-start text-lg '>Confirmar contraseña</label>
      <input className='p-2 w-full sm:w-96  text-lg' name='' type='password' placeholder='' />
      <label className='font-medium self-start text-lg '>Domicilio</label>
      <input className='p-2 w-full sm:w-96  text-lg' name='' type='text' placeholder='' />
      <label className='font-medium self-start text-lg '>Email</label>
      <input className='p-2 w-full sm:w-96  text-lg' name='' type='email' placeholder='' />
      <label className='font-medium self-start text-lg '>Confirmar Email</label>
      <input className='p-2 w-full sm:w-96  text-lg' name='' type='email' placeholder='' />
      <div className='flex w-full gap-3 justify-start sm:items-center sm:justify-center'>
        <input type='checkbox' className='' />
        <label className='text-lg font-medium ' htmlFor="">Declaro haber leido los terminos y condiciones de petSitterFinder</label>
      </div>
      <div className='flex w-full gap-3 justify-start sm:items-center sm:justify-center'>
        <input type='checkbox' className='' />
        <label className='text-lg font-medium ' htmlFor="">Quiero recibir noticias y actualizaciones por email</label>
      </div>


      <button className=' w-full p-5 my-10 text-xl font-semibold duration-500 transition-all rounded-2xl bg-violet-300 hover:scale-105  hover:bg-violet-700 hover:text-white hover:bg-cover shadow-2xl'>Crear usuario</button>
      </form>
    </section>
    <Footer/>

    </>
  )
}

export default SignUpView