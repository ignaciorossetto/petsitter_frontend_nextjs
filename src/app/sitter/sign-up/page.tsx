import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import SitterSignUpForm from '@/components/SitterSignUpForm'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
    <NavBar type='sitter'/>
    <SitterSignUpForm />
    <Footer />
    </Suspense>
  )
}

export default page