import LoginForm from '@/components/Admin/LoginForm'
import NavBar from '@/components/Admin/NavBar'
import Footer from '@/components/Footer'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
        <NavBar/>   
        <LoginForm />
        <Footer />
    </Suspense>
  )
}

export default page