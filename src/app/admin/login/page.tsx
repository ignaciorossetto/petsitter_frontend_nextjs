import LoginForm from '@/components/Admin/LoginForm'
import NavBar from '@/components/Admin/NavBar'
import Footer from '@/components/Footer'
import React from 'react'

const page = () => {
  return (
      <div>
        <NavBar/>   
        <LoginForm />
        <Footer />
    </div>
  )
}

export default page