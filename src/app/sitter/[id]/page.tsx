import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import SitterDashboard from '@/components/SitterDashboard'
import React from 'react'

const page = () => {
  return (
    <>
    <NavBar type='sitter'/>
      <SitterDashboard />
    <Footer />

    </>
  )
}

export default page