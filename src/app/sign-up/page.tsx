"use client"
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import SignUpForm from '@/components/SignUpForm';
import GoogleIcon from "../../../public/google_icon.svg";
import { useRouter } from 'next/navigation';
import LoadingPulsePaw from '@/components/LoadingComponents/LoadingPulsePaw';


const SignUpView = () => {
  const [submittingForm, setSubmittingForm] = useState<boolean>(false
    )
  const [submittedForm, setSubmittedForm] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const router = useRouter();

  
  const handleGoogleBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setSubmittingForm(true);
    try {
      window.open(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`,
        "target=_self"
      );
    } catch (error) {
      router.push("/error?code=3");
    }
  };

  return (
    <>
    <NavBar/>
    <section className='flex flex-col items-center justify-center w-full bg-[url("/gradient.png")] bg-cover rounded-2xl min-h-[80vh] shadow-2xl'>
      {
          submittingForm &&
          <LoadingPulsePaw containerClasses='xxs:text-[30px] tracking-wide -mt-32' text='REGISTRANDO...'/>
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
          <>
            <button
                          onClick={handleGoogleBtn}
                  className={`flex gap-3 bg-white/60 py-2 px-7 items-center justify-center cursor-pointer hover:scale-105 active:scale-100 duration-200 mt-10`}
                  >
                <GoogleIcon className=" w-10 h-10" /> 
                  <span
                className=" text-black font-semibold text-md xxs:text-lg xs:text-2xl"
              > Continuá con Google
              </span>
            </button>
            <div
                  className="w-full flex gap-3 justify-center items-center mt-5"
                  >
                    <span
                    className="h-[2px] w-[150px] bg-black/25"
                    ></span>
                    <span
                    className="font-bold text-black/40"
                    >o</span>
                    <span
                    className="h-[2px] w-[150px] bg-black/25"
                    ></span>
                  </div>
            <SignUpForm 
            setSubmittingForm={setSubmittingForm}
            setEmail={setEmail}
            setSubmittedForm={setSubmittedForm}
            />
        </>
      }
    </section>
    <Footer/>

    </>
  )
}

export default SignUpView