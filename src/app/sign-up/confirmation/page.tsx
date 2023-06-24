"use client"
import Confirmation from '@/components/Confirmation'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React, { useEffect } from 'react'

const page = () => {

  return (
    <>
    <NavBar/>
    <section className='p-10 min min-h-[60vh] flex flex-col items-center'>
        <Confirmation/>
    </section>
    <Footer/>
    </>
  )
}

export default page