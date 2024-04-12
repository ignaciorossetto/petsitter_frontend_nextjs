import Footer from '@/components/Footer'
import Messenger from '@/components/Messenger'
import NavBar from '@/components/NavBar'
import React, { Suspense } from 'react'

const page = (prop:any) => {
    

  return (
    <Suspense>
      <NavBar type='sitter'/>
      <Messenger type='sitter' />
    </Suspense>
  )
}

export default page