"use client"
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Error = () => {
const searchParams = useSearchParams();
    let code: string | null | number = searchParams.get("code");
    const [error, setError] = useState<string | null>(null)
    const [errorCode, setErrorCode] = useState<number>(Number(code))
    const [loading, setLoading] = useState<boolean>(true)
    const [email, setEmail] = useState<string>('')
    const [mailSent, setMailSent] = useState<boolean>(false)

    const handleSendEmail = async(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true)
        setEmail('')
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resendConfirmationMail`, {email: email}, {withCredentials:true})
            setMailSent(true)
            setLoading(false)
        } catch (error:any) {
            if (error?.response?.status === 404 || error?.response?.status === 400) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: 'error',
                    title: error?.response?.data.message
                  });
                
                setLoading(false)
                 return
            }
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: 'error',
                title: 'No se pudo enviar el mensaje. Intenta más tarde!'
              });
              setErrorCode(5)
             setLoading(false)
        }

    }

    useEffect(()=> {
        switch (errorCode) {
            case 1:
                setError('Usuario no identificado!')
                setLoading(false)
                break;
            case 2:
                setError('No se pudo crear la mascota! Intentar mas tarde')
                setLoading(false)
                break;
            case 3:
                setError('No confirmaste tu cuenta vía email.')
                setLoading(false)
                break;
            default:
                setError('Upss.. Intenta más tarde!')
                setLoading(false)
                break;
        }
    }, [errorCode])


    return (
      <Suspense>
    <div className='w-full flex flex-col items-center justify-start min-h-[60vh]'>
        {loading ? <FontAwesomeIcon size='2xl' icon={faSpinner}  className='h-16 w-16 p-20' spin/> : <div className='text-2xl font-medium p-20'>{error}</div>}
        {(Number(code) === 3 && !loading) && 
        <>
        <div className='text-center font-medium mb-5 text-xl'>Envía de nuevo el email de confirmación!</div>
        {
            !mailSent ? 
            <form>
                <input minLength={5} onChange={(e)=>setEmail(e.target.value)} className='rounded-2xl shadow-2xl border-2 mr-5 p-3 pr-10' value={email} type='email' placeholder='123@example.com'/> 
                <button onClick={handleSendEmail} className='p-3 text-md font-medium bg-violet-300 rounded-2xl hover:bg-violet-800 hover:scale-110 hover:text-white ease-in-out duration-200 '>Enviar</button>
            </form> 
        : 
            <div>
                <FontAwesomeIcon icon={faCheck} className="mr-3 h-8 w-8 text-green-400" /> <span className='text-lg font-medium'> Mail enviado correctamente!!</span>
            </div>
        }
        
        </>
        }
            </div>
            </Suspense>
  )
}

export default Error