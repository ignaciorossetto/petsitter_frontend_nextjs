"use client"
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Error = () => {
const searchParams = useSearchParams();
    const code: string | null = searchParams.get("code");
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        switch (Number(code)) {
            case 1:
                setError('Usuario no identificado!')
                setLoading(false)
                break;
            case 2:
                setError('No se pudo crear la mascota! Intentar mas tarde')
                setLoading(false)
                break;
            default:
                setError('Upss.. Intenta más tarde!')
                setLoading(false)
                break;
        }
    }, [])


  return (
    <div className='w-full flex justify-center min-h-[60vh]'>
        {loading ? <FontAwesomeIcon icon={faSpinner}  className='h-16 w-16 p-20' spin/> : <div className='text-2xl font-medium p-20'>{error}</div>}
    </div>
  )
}

export default Error