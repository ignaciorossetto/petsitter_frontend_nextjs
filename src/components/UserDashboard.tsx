"use client"
import { UserContext } from '@/hooks/auth/authContext'
import {  faUser } from '@fortawesome/free-regular-svg-icons'
import {  faCalendarPlus, faHouse, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import {   useLoadScript } from "@react-google-maps/api";
import { useForm } from 'react-hook-form';
import AddressGoogleMapInput from './AddressGoogleMapInput'



const UserDashboard = () => {
  const [messages, setMessages] = useState<any>([])
    const [address, setAddress] = useState()
  const {register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm<any>()
  const {user, setUser} = useContext(UserContext)
  const [loadingProfileImg, setLoadingProfileImg] = useState(false)
  const [loadingNewAddress, setLoadingNewAddress] = useState(false)
  const [file, setFile] = useState(null)
  const [profileImg, setProfileImg] = useState(user?.profileImg)
  console.log(user)
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries: ['places'],
})
  
  const handleOnChangeProfileImg = (e:any) => {
    const img = e?.target?.files[0]
    setFile(img)
    const newImg = URL?.createObjectURL(img)
    setProfileImg(newImg)
  }

  const handleConfirmNewProfileImg = async(e:any) => {
    setLoadingProfileImg(true)
    try {
        let formData:any = new FormData()
        formData.append('profileImg', file)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user._id}/profileImg`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
              },
            withCredentials: true
        })
        setUser(response.data)
        setLoadingProfileImg(false)
    } catch (error) {
        setLoadingProfileImg(false)
        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: `No se pudo cambiar la foto de perfil! Intenta mas tarde...`,
          });
    }
  }
  


  const onSubmitHandler = async() => {
    const obj = {
        fullAddress: address
    }
    setLoadingNewAddress(true)
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user._id}`, obj ,{withCredentials:true})
        setUser(response.data)
        setLoadingNewAddress(false)
    } catch (error) {
        setLoadingNewAddress(false)
        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: `No se pudo cambiar el domicilio! Intenta mas tarde...`,
          });
    }
  }


  return (
    <div className='flex flex-col'>
    {
        loadingProfileImg ? <FontAwesomeIcon icon={faSpinner} spin className='w-20 h-20 text-start ml-[200px]'/> : 
        
    <div className='flex gap-5 items-center'>
        {
            profileImg ?
            <Image 
        src={ profileImg }
        width={150} 
        height={150} 
        alt='profile-img'
        className='rounded-lg h-[150px] w-[150px] object-cover'
        /> : <FontAwesomeIcon icon={faUser} className='h-[150px] w-[150px]'/>
        }
        
        <div className='flex flex-col gap-3'>
            <h1 className='font-semibold text-2xl'>{user?.username}</h1>
            <p className='font-medium italic'>{user?.email}</p>
            <input onChange={handleOnChangeProfileImg} type="file" placeholder='Presiona aqui para cambiar tu foto'/>
            <button onClick={handleConfirmNewProfileImg} className='px-5 py-2 bg-violet-300 hover:bg-violet-800 hover:scale-110 hover:text-white duration-200 font-medium w-fit rounded-2xl'>Confirmar cambio de foto</button>
        </div>
    </div>
    }
    <hr className="h-px my-8 bg-gray-200 border-1 dark:bg-gray-800"></hr>
    <div className='flex gap-5 items-center'>
        {
            loadingNewAddress ? <FontAwesomeIcon icon={faSpinner} spin
            className='w-full text-center h-20'
            /> :
         <>
        <FontAwesomeIcon icon={faHouse} className='h-[150px] w-[150px]'/>
        <div className='flex flex-col gap-3'>
            {user?.fullAddress?.address ? 
            <h1 className='text-xl font-semibold'>{user?.fullAddress?.address}</h1>
            :
            <h1 className='text-xl font-semibold'>No configuraste tu domicilio!</h1>
            }
            <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-3'>
            {
            isLoaded &&
            <AddressGoogleMapInput 
            setAddress={setAddress}
            register={register}
            errors={errors}
            className='rounded-2xl border-2'
            />
          }
            <input className='px-5 py-2
             bg-violet-300 hover:bg-violet-800 hover:scale-110 hover:text-white duration-200 font-medium w-fit rounded-2xl
             cursor-pointer
             '
             type='submit'
             disabled={!isLoaded}
             value={'Confirmar nuevo domicilio!'}
             />   
            </form>
             </div>
             
            </>
            }
    </div>


    {
              messages.map((e:any)=> {
                console.log(e)
                return <div key={e}>
                  {e}
                </div>
              })
             }


    <hr className="h-px my-8 bg-gray-200 border-1 dark:bg-gray-800"></hr>
    <div className='flex gap-5'>
        <FontAwesomeIcon icon={faCalendarPlus} className='h-[150px] w-[150px]'/>
        <div className='flex flex-col gap-3 h-full items-start justify-center'>
        <h1 className='text-xl font-semibold self-start'>Historial de cuidados</h1>
        <p>15/8/2023 ---- Sitter: Juan Sklar ---- Rate: 4.4</p>
        <p>12/5/2023 ---- Sitter: Juan Sklar ---- Rate: 4.4</p>
        <p>07/01/2023 ---- Sitter: Juan Sklar ---- Rate: 4.4</p>
        <button className='px-5 py-2
             bg-violet-300 hover:bg-violet-800 hover:scale-110 hover:text-white duration-200 font-medium w-fit rounded-2xl'>Ver todos</button>
        </div>
    </div>
    </div>
  )
}

export default UserDashboard