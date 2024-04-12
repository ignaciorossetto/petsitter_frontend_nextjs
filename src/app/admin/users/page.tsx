import AdminUsersDashboard from '@/components/Admin/AdminUsersDashboard'
import NavBar from '@/components/Admin/NavBar'
import Footer from '@/components/Footer'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
        <NavBar />
            <AdminUsersDashboard />
        <Footer />
    </Suspense>
  )
}

export default page