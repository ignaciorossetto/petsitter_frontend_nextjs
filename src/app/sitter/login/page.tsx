"use client"
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import LoginFormSitter from '@/components/LoginFormSitter'
import { Suspense } from 'react'

const page = () => {


  return (
    <Suspense>
    <NavBar type='sitter'/>
      <div className='flex flex-col justify-between min-h-full h-[80vh] my-5 -mb-4 shadow-2xl'>
        <div className="flex flex-1 rounded-xl">
          <div className='hidden md:block w-7/12 bg-white bg-[url("/sitter-4.jpg")] bg-cover bg-right rounded-l-xl' />
        <div
        className={`flex flex-col items-center p-10 w-full rounded-xl 
          bg-gradient-to-tr from-lime-400 to-emerald-300
         bg-cover md:w-5/12  md:rounded-l-none`}
          >
            <h1 className="text-[35px] p-10">
          Sitters Login
        </h1>
        <LoginFormSitter />
      </div>
      </div>
      </div>
    <Footer/>
    </Suspense>
  )
}

export default page