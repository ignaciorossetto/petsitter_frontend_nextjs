import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {   useLoadScript } from "@react-google-maps/api";
import AddressGoogleMapInput from '@/components/AddressGoogleMapInput';
import axios from 'axios'
import Swal from 'sweetalert2';
import { AddressType, SignUpFormType, SignUpFormPropsType } from '@/types/types';



 

const SignUpForm = ({setSubmittingForm, setEmail, setSubmittedForm}:SignUpFormPropsType) => {
  const [address, setAddress] = useState<AddressType>()
  const {register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm<SignUpFormType>()
  const onSubmitHandler = async(values: SignUpFormType) => {
    values.fullAddress = address!
    values.strategy = 'local'
    try {
      setSubmittingForm(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, values)
      if(response) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Registrado correctamente!'
        });
        setEmail(values.email)
        reset(values);
        setSubmittingForm(false)
        setSubmittedForm(true)
      }
      
    } catch (error:any) {
      setSubmittingForm(false)
      const errors = error.response.data
      setError('email', {
        type: "server",
        message: errors.error,
      });
    }
  }
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


  return (
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
              {" "}
              Las contrasenas deben contener al menos 7 caracteres
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
      </form>
  )
}

export default SignUpForm