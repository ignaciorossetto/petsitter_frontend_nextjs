"use client"
import NavBar from '@/components/NavBar'
import GoogleIcon from '../../../public/icons8-google-1000.svg'
import Footer from '@/components/Footer'
import { FormEvent, useRef } from 'react'
import LoginForm from '@/components/LoginForm'

const loginView = () => {

   


  return (
    <>
    <NavBar />
    <div className='flex flex-col justify-between min-h-full h-[80vh] my-5 -mb-4 shadow-2xl'>
        <LoginForm/>
    </div>
    <Footer/>
    </>
  )
}

export default loginView