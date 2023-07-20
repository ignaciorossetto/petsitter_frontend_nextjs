"use client"
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import SignUpForm from '@/components/SignUpForm';

const SignUpView = () => {
  const [submittingForm, setSubmittingForm] = useState(false
    )
  const [submittedForm, setSubmittedForm] = useState(false)
  const [email, setEmail] = useState<string>('')
  

  return (
    <>
    <NavBar/>
    <section className='flex flex-col items-center justify-center w-full bg-[url("/gradient.png")] bg-cover rounded-2xl min-h-[80vh] shadow-2xl'>
      {
        submittingForm && <FontAwesomeIcon size='2xl' icon={faSpinner} spin />
      }
      {
        submittedForm && 
        <div className={`py-5 w-full flex flex-col justify-start`}>
        <h1 className='text-3xl break-all font-semibold mb-5 text-center'>Felicitaciones!</h1>
        <h3 className='hidden sm:block p-2 py-3 break-all break-normal xs:px-[10%] sm:px-[25%] lg:pl-[35%]  text-2xl'>Creaste tu cuenta exitosamente.</h3>
        <h3 className='p-2 py-3 break-all xs:px-[10%] sm:px-[25%] lg:pl-[35%] text-xl sm:text-2xl'>Te enviamos un mail a <br /> <span className='font-bold'>{email}</span></h3>
        <h3 className='p-2 py-3 break-all xs:px-[10%] sm:px-[25%] lg:pl-[35%] text-xl sm:text-2xl'> Hace click en el link para confirmarla.</h3>
        <br />
        <h3 className='p-2 text-center text-2xl font-semibold'>Ir a <Link href={'/'}><FontAwesomeIcon className='hover:scale-105 duration-200' icon={faHome}/></Link></h3>
      </div>
      }
      {
        (!submittingForm && !submittedForm) &&
        <SignUpForm 
        setSubmittingForm={setSubmittingForm}
        setEmail={setEmail}
        setSubmittedForm={setSubmittedForm}
        />
      }
    </section>
    <Footer/>

    </>
  )
}

export default SignUpView