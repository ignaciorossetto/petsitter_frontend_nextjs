"use client"
import Confirmation from '@/components/Confirmation'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const ConfirmationView = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <>
    <NavBar type={type}/>
    <section className='p-10 min min-h-[60vh] flex flex-col items-center'>
        <Confirmation/>
    </section>
    <Footer/>
    </>
  )
}

export default ConfirmationView