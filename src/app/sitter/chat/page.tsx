import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import SitterMessenger from '@/components/SitterMessenger'
import React from 'react'

const page = (prop:any) => {
    

  return (
    <>
    <NavBar type='sitter'/>
    <SitterMessenger />
    </>
  )
}

export default page