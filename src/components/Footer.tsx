import Instagram from '../../public/instagram.svg'
import Twitter from '../../public/twitter.svg'
import Linkedin from '../../public/linkedin.svg'

const Footer = () => {
  return (
    <div className='shadow-2xl flex flex-col gap-3 justify-between items-center mb-5 mt-8 lg:mt-10 lg:bg-white pt-8 lg:pt-5  lg:rounded-2xl bg-bottom  w-full h-40 lg:h-40 bg-cover'>
        <div className='px-10 w-full flex justify-between'>
            <div className='hidden sm:flex sm:flex-col  gap-2 w-7/12'>
                <h4 className=' text-xl font-bold text-black'>Recibí las ultimas novedades!</h4>
                <div className=' flex gap-2'>
                <input type='email' className='bg-white border-black border placeholder:text-black focus:outline-none  focus:placeholder:text-slate-400 focus:bg-white  p-2 rounded-xl' placeholder='Ingresa tu email'  />
                <button className='text-lg text-black border-black border p-2 rounded-xl hover:scale-105 hover:bg-violet-400 duration-200'>Suscribir</button>
                </div>
            </div>
            <div className='flex gap-3 items-center justify-center sm:justify-end w-full sm:w-6/12 pr-0 sm:pr-5'>
                <Instagram className='h-7 w-7 cursor-pointer hover:fill-instagram hover:scale-105 duration-200' />
                <Twitter className='h-7 w-7 cursor-pointer hover:fill-twitter hover:scale-105 duration-200' />
                <Linkedin className='h-7 w-7 cursor-pointer hover:fill-linkedin hover:scale-105 hover:bg-white/75 duration-200' />
            </div>      
        </div>
        <div className='pb-5'>
                <p className='text-center text-black font-medium'>© 2023 PetSitterFinder.com.ar ™ </p>
        </div>
    </div>
  )
}

export default Footer