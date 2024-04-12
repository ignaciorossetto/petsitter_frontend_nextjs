"use client"
import Confirmation from '@/components/Confirmation'
import Footer from '@/components/Footer'
import LoadingPulsePaw from '@/components/LoadingComponents/LoadingPulsePaw'
import NavBar from '@/components/NavBar'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

const ConfirmationView = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || undefined

  return (
    <Suspense fallback={<LoadingPulsePaw /> }>
      <NavBar type={type}/>
      <section className='p-10 min min-h-[60vh] flex flex-col items-center'>
          <Confirmation/>
      </section>
      <Footer/>
    </Suspense>
  )
}

export default ConfirmationView