import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import UserDashboard from '@/components/UserDashboard'
import React from 'react'

const page = () => {
  return (
    <>
    <NavBar />
      <UserDashboard type='user'/>
    <Footer/>
    </>
  )
}

export default page