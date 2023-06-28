import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import NewPetForm from '@/components/NewPetForm'
import React from 'react'

const page = () => {
  return (
    <>
        <NavBar/>
        <NewPetForm/>
        <Footer/>
    </>
  )
}

export default page