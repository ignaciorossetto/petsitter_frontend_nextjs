import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import NewPetForm from '@/components/NewPetForm'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
        <NavBar/>
        <NewPetForm/>
        <Footer/>
    </Suspense>
  )
}

export default page