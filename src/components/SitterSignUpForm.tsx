"use client"
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import {   useLoadScript } from "@react-google-maps/api";
import AddressGoogleMapInput from '@/components/AddressGoogleMapInput';
import axios from 'axios'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { AddressType, SitterSignUpFormType } from '@/types/types';


  





const SitterSignUpForm = () => {
  const [address, setAddress] = useState<AddressType>({
    address: '',
    latLng: {
      lat: 0,
      lng: 0,
    }
  })
  
  const [addressFileInput, setAddressFileInput] = useState()
  const [email, setEmail] = useState(null)
  const [submittedForm, setSubmittedForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileImg, setProfileImg] = useState()
  const {register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm<SitterSignUpFormType>()
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries: ['places'],
})

  const checkEmail = ():boolean => {
    const email = watch("email");
    const confirmEmail = watch("confirmEmail");
    return email === confirmEmail;
  };
  const checkPswd = ():boolean => {
    const password = watch("password");
    const confirmPswd = watch("confirmPswd");
    return password === confirmPswd;
  };

    const onSubmitHandler = async(data:any, e:any) => {
        setLoading(true)
        e.preventDefault();
        let formData = new FormData()
        const modifiedAddressFile = new File([addressFileInput!], `addressFile`, {type: addressFileInput})
        const modifiedProfileImg = new File([profileImg!], `profileImg`, {type: profileImg})
        formData.append('files', modifiedAddressFile!) 
        formData.append('files', modifiedProfileImg!) 
        for (const key in data) {
            formData.append(key, data[key])
        }
        formData.append('address', address.address!)
        formData.append('latLng', JSON.stringify([address.latLng!.lng, address.latLng!.lat]))
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sitter-register`, formData, {
                withCredentials: true,
                headers: {
                            "Content-Type": "multipart/form-data",
                        }
            }) 
            setEmail(data.email)
            reset(data)
            setSubmittedForm(true)
            setLoading(false)           
        } catch (error:any) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: 'error',
                title: error.response.message
              });
            reset(data)
            setLoading(false)           
        }
    }
  return (
    <div className='w-full flex justify-center min-h-[400px] 
    bg-gradient-to-tr from-lime-400 to-emerald-300'>
    {loading && <FontAwesomeIcon icon={faSpinner} spin size='2xl' className='mt-10'/>}
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
    {(!loading && !submittedForm) &&
    <form  className={` flex flex-col gap-3 p-5 items-center sm:w-96`} onSubmit={handleSubmit(onSubmitHandler)}>
      <h1 className='text-5xl mb-2 text-center font-medium pt-5'>Registro</h1>

      <label className='font-medium w-full sm:w-96 self-start text-lg '>Nombre completo</label>
      <input {...register('username', {
                required: true,
                minLength: 3,
                maxLength: 50,
              })} 
              className='p-2 w-full sm:w-96  text-lg' 
              type='text' 
              placeholder='' />
      {errors.username?.type === "required" && (
        <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '>Debe ingresar nombre y apellido</p>
      )}
      {errors.username?.type === "minLength" && (
        <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '>Debe ingresar un usuario</p>
      )}
      {errors.username?.type === "maxLength" && (
        <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '>Campo muy largo</p>
      )}

    <label className='font-medium self-start text-lg '>Contraseña</label>
    <input {...register('password', {
                required: true,
                minLength: 7,
              })} 
              className='p-2 w-full sm:w-96  text-lg' 
              type='password' 
              placeholder='' />
       {errors.password?.type === "minLength" && (
            <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '>
              Las contraseñas deben contener al menos 7 caracteres
            </p>
          )}
      <label className='font-medium self-start text-lg '>Confirmar contraseña</label>
      <input {...register("confirmPswd", {
                required: true,
                minLength: 7,
                validate: checkPswd,
              })}  
              className='p-2 w-full sm:w-96  text-lg'  
              type='password' 
              placeholder='' />
       {errors.confirmPswd?.type === "validate" && (
            <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '> Las contrasenas deben coincidir</p>
          )}
        {errors.confirmPswd?.type === "minLength" && (
          <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '>
            {" "}
            Las contrasenas deben contener al menos 7 caracteres
          </p>
        )}  

      <label  className='font-medium self-start text-lg '>Domicilio</label>
      {
            isLoaded &&
            <AddressGoogleMapInput 
            setAddress={setAddress}
            register={register}
            errors={errors}
            />
          }
      <label  className='font-medium self-start text-lg '>Comprobante domicilio</label>

      <input {...register('addressFile', {
          required: true,
        })}
        onChange={(e:any)=>setAddressFileInput(e.target.files[0])} 
        type='file'
        className='p-2 w-full sm:w-96  text-lg' 
        /> 
      {errors.addressFile?.type === "required" && (
            <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '> Es obligatorio el comprobante de domicilio</p>
          )}   
      <label  className='font-medium self-start text-lg '>Email</label>
      <input {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })} 
              className='p-2 w-full sm:w-96  text-lg'  
              type='email' 
              placeholder='' />
      {errors.email && (
            <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '> {errors.email.message}</p>
          )  }        
      <label  className='font-medium self-start text-lg '>Confirmar Email</label>
      <input {...register("confirmEmail", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                validate: checkEmail,
              })} 
              className='p-2 w-full sm:w-96  text-lg'  
              type='email' 
              placeholder='' />
          {errors.confirmEmail?.type === "validate" && (
            <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '> Los correos deben coincidir</p>
          )}
          {errors.confirmEmail?.type === "pattern" && (
            <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '> Debe ser un email valido</p>
          )}
          {errors.confirmEmail?.type === "required" && (
            <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '> Es obligatorio confirmar el mail</p>
          )} 
          <label  className='font-medium self-start text-lg '>Foto perfil</label>
          <input {...register('profileImg', {
                required: true,
      })} 
            type='file'
            className='p-2 w-full sm:w-96 text-lg'
            onChange={(e:any)=>setProfileImg(e.target.files[0])}  
            /> 
      {errors.profileImg?.type === "required" && (
            <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '> Es obligatorio subir foto de perfil</p>
          )}          
      <div className='flex w-full gap-3 justify-start sm:items-center sm:justify-center'>
        <input {...register("termsCheckBock", {
                required: true,
              })} 
              type='checkbox' 
              className=''
              />    
        <label  className='text-lg font-medium ' htmlFor="">Declaro haber leido los terminos y condiciones de petSitterFinder</label>
      </div>
        {errors.termsCheckBock?.type === "required" && (
            <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '>
              Para registrarte debes aceptar terminos y condiciones!
            </p>
          )}
      <div className='flex w-full gap-3 justify-start sm:items-center sm:justify-center'>
        <input {...register('newsCheckBox')} type='checkbox' className='' />
        <label  className='text-lg font-medium ' htmlFor="">Quiero recibir noticias y actualizaciones por email</label>
      </div>


      <button className=' w-full p-5 my-10 text-xl font-semibold duration-500 transition-all rounded-2xl bg-violet-300 hover:scale-105  hover:bg-violet-700 hover:text-white hover:bg-cover shadow-2xl'>Crear usuario</button>
      </form>}
      </div>
  )
}

export default SitterSignUpForm