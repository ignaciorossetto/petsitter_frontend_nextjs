import Error from '@/components/Error'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React, { Suspense } from 'react'


const page = () => {

  return (
    <Suspense>
        <NavBar />   
        <Error/>
        <Footer />
    </Suspense>
  )
}

export default page