import Footer from '@/components/Footer'
import Messenger from '@/components/Messenger'
import NavBar from '@/components/NavBar'
import React from 'react'

const page = (prop:any) => {
    

  return (
    <>
      <NavBar type='sitter'/>
      <Messenger type='sitter' />
    </>
  )
}

export default page