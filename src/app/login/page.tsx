"use client"
import NavBar from '@/components/NavBar'
import GoogleIcon from '../../../public/icons8-google-1000.svg'
import Footer from '@/components/Footer'

const loginView = () => {
  return (
    <>
    <NavBar />
    <div className='flex flex-col justify-between min-h-full h-[80vh] my-5 -mb-4 shadow-2xl'>
    <div className='flex flex-1 '>
        <div className='hidden md:block w-6/12 bg-center bg-white bg-[url("/ai_dog_3.png")] bg-cover rounded-l-xl'/>
        <div className='flex flex-col items-center w-full rounded-xl bg-[url("/gradient.png")] bg-cover md:w-6/12  md:rounded-l-none  '>
            <h1 className='text-[35px] p-10'>
                Login
            </h1>
            <form>
                <label className='font-medium text-[20px] mb-5'>Usuario</label>
                <br />
                <input className='p-2 my-4 rounded-sm' type="text" />
                <br />
                <label className='font-medium text-[20px] mb-5'>Contraseña</label>
                <br />
                <input className='p-2 my-4 rounded-sm' type="password" />
                <br />
                <br />
                <button className='w-full bg-violet-200 bg-left-top bg-cover text-black font-semibold text-xl p-3 rounded-2xl shadow-2xl hover:scale-105 duration-200'>
                    Iniciar sesión
                </button>
                <br />
            </form>
                <br />
                <button className='bg-violet-200 text-black bg-cover font-semibold text-md p-3 shadow-2xl   rounded-2xl flex items-center justify-between w-[217px] hover:scale-105 duration-200 '>
                    <GoogleIcon className='bg-white w-10 h-10'/> Ingresa con Google
                </button>


        </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default loginView