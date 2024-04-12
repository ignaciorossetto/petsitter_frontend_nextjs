import AdminLanding from '@/components/Admin/AdminLanding'
import NavBar from '@/components/Admin/NavBar'
import Footer from '@/components/Footer'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
          <NavBar />
          <AdminLanding />
          
          <Footer />
    </Suspense>
  )
}

export default page