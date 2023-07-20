"use client"
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import LoginForm from '@/components/LoginForm'

const page = () => {


  return (
    <>
    <NavBar type='sitter'/>
    <div className='flex flex-col justify-between min-h-full h-[80vh] my-5 -mb-4 shadow-2xl'>
        <LoginForm type='sitter'/>
    </div>
    <Footer/>
    </>
  )
}

export default page