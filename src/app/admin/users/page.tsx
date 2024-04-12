import AdminUsersDashboard from '@/components/Admin/AdminUsersDashboard'
import NavBar from '@/components/Admin/NavBar'
import Footer from '@/components/Footer'
import React  from 'react'

const page = () => {
  return (
    <>
        <NavBar />
            <AdminUsersDashboard />
        <Footer />
    </>
  )
}

export default page