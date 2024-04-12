import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import UserDashboard from '@/components/UserDashboard'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
    <NavBar />
      <UserDashboard/>
    <Footer/>
    </Suspense>
  )
}

export default page