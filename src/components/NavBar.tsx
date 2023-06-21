"use client"
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'

const NavBar = () => {
    const [showNavBarModal, setShowNavBarModal] = useState(false)


  return (
    <nav className='z-10 shadow-2xl w-full bg-white rounded-2xl  h-[5rem] flex justify-between items-center p-10 mb-5 sticky top-0'>
        <div className='sm:hidden cursor-pointer hover:scale-110' onClick={()=> setShowNavBarModal(prev=> !prev)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        </div>
        <h1 className='flex gap-2 items-center justify-center text font-semibold  text-xl md:text-2xl tracking-widest cursor-pointer text-orange-400'>
            <Link href='/'>
                PetSitterFinder 
            </Link>
            <FontAwesomeIcon icon={faPaw}/>
        </h1>
        <div className='hidden sm:flex gap-4 font-medium text-black '>
            <span className='cursor-pointer
             hover:scale-105 duration-200 bg-violet-300 p-3 rounded-lg'><Link href='/login'>Ingresar</Link></span>
            <span className='cursor-pointer
             hover:scale-105 duration-200 bg-violet-300 p-3 rounded-lg'><Link href='/sign-up'>Registrar</Link></span>
        </div>
        {
            showNavBarModal && 
        <div className='sm:hidden fixed left-0 top-0 w-full h-full bg-white/50 flex z-10'>
            <div className='menuContainer  w-44 h-full bg-white border-r-2 border-orange-400/25 p-5 flex flex-col justify-between'>
                <div className=''>
                <FontAwesomeIcon icon={faXmarkCircle} size='xl'  className='cursor-pointer align-baseline justify-start' onClick={()=> setShowNavBarModal(prev=> !prev)}/>
                <h1 className=' text-center text-xl font-semibold mt-4'>MENU</h1>
                </div>
                <div className='pb-5 '>
                    <h3 className='font-normal hover:scale-105 cursor-pointer'><Link href='/login'>Login</Link></h3>
                    <h3 className='font-normal hover:scale-105 cursor-pointer'><Link href='/sign-up'>Sign up</Link></h3>
                <div className='text-xs mt-5'>
                <p className='text-center'>
                © 2023 
                </p>
                <p className='text-center'>PetSitterFinder.com.ar™</p>
                </div>
                </div>
            </div>
            <div className='menuContainer w-8/12 h-full bg-transparent' onClick={()=> setShowNavBarModal(prev=> !prev)}/>
        </div>
        }
    </nav>
  )
}

export default NavBar