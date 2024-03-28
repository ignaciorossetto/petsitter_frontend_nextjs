"use client"
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import LoginFormUser from '@/components/LoginFormUser'

const loginView = () => {

   


  return (
    <>
    <NavBar />
    <div className='flex flex-col justify-between min-h-full h-[80vh] my-5 -mb-4 shadow-2xl'>
    <div className="flex flex-1 rounded-xl">
      <div className='hidden md:block w-6/12 bg-white bg-[url("/sitter-4.jpg")] bg-cover bg-right rounded-l-xl' />

      <div
        className={`flex flex-col items-center w-full rounded-xl bg-[url("/gradient.png")] bg-cover md:w-6/12  md:rounded-l-none  `}
      >
        <h1 className="text-[35px] p-10">
          Login
        </h1>
        <LoginFormUser containerClasses='w-[75%]' formClasses='gap-4'/>
          </div>
          </div>
    </div>
    <Footer/>
    </>
  )
}

export default loginView