"use client"
import { AdminContext, AdminContextType } from '@/hooks/auth/adminContext'
import { adminLoginRequest } from '@/utils/axiosRequests'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useContext, useState } from 'react'
import Swal from 'sweetalert2'

const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
  const { setAdmin } = useContext<AdminContextType>(AdminContext);


    const handleFormSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {elements} = e.currentTarget
        const email = elements.namedItem('email')
        const isEmail = email instanceof HTMLInputElement
        const password = elements.namedItem('password')
        const isPass = password instanceof HTMLInputElement
        if (!isEmail || email == null) return
        if (!isPass || password == null) return
        const obj = {
            email: email.value,
            password: password.value
        }
        try {
            setLoading(true)
            const response = await adminLoginRequest(obj)
            Swal.fire({
                title: 'Login success',
                timer: 1500,
                position: 'top-right',
                toast: true,
                icon: 'success'
            })
            setAdmin(response.payload);
            // socket.current.emit("identity", response.payload?._id);

            Swal.fire({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: `Bienvenido ${response?.payload?.username}!`,
            });
            localStorage.setItem('psf-admin-jwt', response?.token);
            router.push('/admin')
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire({
                title: 'Login Failed',
                timer: 1500,
                position: 'top-right',
                toast: true,
                icon: 'error'
            })
        }
        
    }

  return (
    <div className="flex flex-1 rounded-xl">
    <div className='hidden md:block w-6/12 bg-white bg-[url("/sitter-4.jpg")] bg-cover bg-right rounded-l-xl' />

    <div
      className={`flex flex-col items-center w-full rounded-xl  bg-cover md:w-6/12  md:rounded-l-none bg-red-800/25 `}
    >
      <h1 className="text-[35px] p-10">
        Admin Login
      </h1>
      
      {loading && (
        <FontAwesomeIcon
          size="2xl"
          className="h-[300px] justify-self-center "
          icon={faSpinner}
          spin
        />
      )}
      {!loading && (
        <>
          <form onSubmit={handleFormSubmit}>
            <label className="font-medium text-[20px] mb-5">Usuario</label>
            <br />
            <input
              className="p-2 my-4 rounded-sm"
              type="text"
              name="email"
              required
            />
            <br />
            <label className="font-medium text-[20px] mb-5">Contraseña</label>
            <br />
            <input
              className="p-2 my-4 rounded-sm"
              type="password"
              name="password"
              required
            />
            <br />
            <br />
              <button
                className={`w-full 
                  bg-left-top bg-cover font-semibold text-xl p-3 rounded-2xl shadow-2xl hover:scale-105 duration-200 bg-white`}
              >
                Iniciar sesión
              </button>

            <br />
          </form>

          <br />
        </>
      )}
    </div>
  </div>
  )
}

export default LoginForm