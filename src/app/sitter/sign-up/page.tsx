import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import SitterSignUpForm from '@/components/SitterSignUpForm'
import React from 'react'

const page = () => {
  return (
    <>
    <NavBar type='sitter'/>
    <SitterSignUpForm />
    <Footer />
    </>
  )
}

export default page