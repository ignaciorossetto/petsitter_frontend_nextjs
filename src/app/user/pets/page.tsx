"use client"
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import PetDashboard from '@/components/PetDashboard'
import React, { useEffect } from 'react'

const page = () => {


  return (
    <>
        <NavBar />
        <PetDashboard />
        <Footer/>
    </>
  )
}

export default page