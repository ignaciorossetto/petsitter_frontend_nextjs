"use client"
import { UserContext, UserContextType } from '@/hooks/auth/authContext'
import {  faUser } from '@fortawesome/free-regular-svg-icons'
import {  faCalendarPlus, faEye, faHouse, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import {   GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useForm } from 'react-hook-form';
import AddressGoogleMapInput from './AddressGoogleMapInput'
import { AddressType, ISitter, IUser, userTypeEnum } from '@/types/types'
import useAuthRequest from '@/hooks/auth/useAuthRequest'
import { useRouter } from 'next/navigation'
import { newAddressRequest, newProfileImgRequest } from '@/utils/axiosRequests'
import LoadingPulsePaw from './LoadingComponents/LoadingPulsePaw'

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"]

const UserDashboard = () => {
  const jwt = localStorage.getItem("psf-jwt");
    const [address, setAddress] = useState<AddressType>()
    const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState: { errors } } = useForm<any>()
  const { verifyToken } = useAuthRequest()
  const {user, setUser} = useContext<UserContextType>(UserContext)
  const [loadingProfileImg, setLoadingProfileImg] = useState<boolean>(false)
  const [loadingNewAddress, setLoadingNewAddress] = useState<boolean>(false)
  const [file, setFile] = useState<File | Blob | null>(null)
  const [profileImg, setProfileImg] = useState(user?.profileImg)
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries: libraries,
})
const router = useRouter()

useEffect(()=> {
  const display = async():Promise<void> => {
    setLoading(true)
    const response = await verifyToken()     
    if (response) {
        setLoading(false)
        return
    } else {
      router.push('/error?code=1')
      setLoading(false)
    }
  }
  display()
}, [])


  
  const handleOnChangeProfileImg = (e:React.ChangeEvent<HTMLInputElement>) => {
    const img = e?.target?.files![0]
    setFile(img)
    const newImg = URL?.createObjectURL(img)
    setProfileImg(newImg)
  }

  const handleConfirmNewProfileImg = async(e:React.MouseEvent<HTMLButtonElement>) => {
    setLoadingProfileImg(true)
    try {
        let formData:any = new FormData()
      formData.append('profileImg', file)
      if (user) {
        const type = userTypeEnum.USER
        const data = await newProfileImgRequest(jwt, formData, type, user._id)
        setUser(data)
        setLoadingProfileImg(false)
      }
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
    const obj = {fullAddress: address}
      setLoadingNewAddress(true)
    try {
      const type = userTypeEnum.USER
        const data = await newAddressRequest(jwt, obj, user!._id, type)
        setUser(data.payload)
        setLoadingNewAddress(false)
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: `Domicilio actualizado correctamente...`,
        });
        
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

    return

  }

  if (loading ) {
    return <FontAwesomeIcon size='2xl' style={{textAlign: 'center', width:'100%', marginBottom: 400, marginTop: 50}} icon={faSpinner} spin/> 
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
              {
                isLoaded ?
              
              <div
                className='relative w-[150px] h-[150px] border-4 border-violet-200 rounded-lg'
              >
                    <div
                    className='absolute w-[150px] h-[150px] shadow-2xl animate-pulse -top-1 -left-1 shadow-violet-400 rounded-lg'
                    />

              <GoogleMap
                mapContainerClassName='w-full h-full rounded-lg'
                zoom={15}
                center={{ lat: user?.fullAddress?.latLng.lat as number, lng: user?.fullAddress?.latLng.lng as number}}
                options={{
                    streetView: null,
                    fullscreenControl: null,
                    mapTypeControl: false,
                    streetViewControl: false,
                    scaleControlOptions: null,
                    disableDoubleClickZoom: false,
                    zoomControl: false,
                    gestureHandling: "none",
                    clickableIcons: false


                                                
                              }}     
            >
            <MarkerF
                position={{ lat: user?.fullAddress?.latLng.lat as number, lng: user?.fullAddress?.latLng.lng as number}}
                icon={{
                    url: "/pawprint.png",
                    
                }}/>

                </GoogleMap>
                </div>
                :
                <LoadingPulsePaw />
              }
                
        <div className='flex flex-col gap-3'>
            {user?.fullAddress?.address ? 
            <h1 className='text-xl font-semibold'>{user?.fullAddress?.address}</h1>
            :
            <h1 className='text-xl font-semibold animate-bounce'>No configuraste tu domicilio!</h1>
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


    <hr className="h-px my-8 bg-gray-200 border-1 dark:bg-gray-800"></hr>
    <div className='flex gap-5'>
        <FontAwesomeIcon icon={faCalendarPlus} className='h-[150px] w-[150px]'/>
        <div className='flex flex-col gap-3 h-full items-center justify-center'>
          <h1 className='text-xl font-semibold self-start'>Historial de cuidados</h1>
          {user?.careOrders?.map((e, index) => {
            if (index > 2) {
              return
            }
            return(
            <div
              key={e?._id}
              className='flex justify-between gap-5 items-center w-[300px]'
            >
              <span>
                {new Date(e?.dates[0]).toLocaleDateString()}
                </span>  
                <div
                className='w-[100px] bg-black h-[2px]'
                />  
              <button
                  className='px-2 py-1 bg-blue-400 text-black rounded-xl hover:scale-105 active:scale-100 duration-200'
                  >
                    <FontAwesomeIcon icon={faEye}/> ver..
                </button>
                
            </div>)}
            
          )
          }
        <button className='px-5 py-2
             bg-violet-300 hover:bg-violet-800 hover:scale-110 hover:text-white duration-200 font-medium w-fit rounded-2xl'>Ver todos</button>
        </div>
    </div>
    </div>
  )
}

export default UserDashboard