"use client"
import React, { Dispatch, useContext, useRef, useState } from "react";
import { UserContext, UserContextType } from "@/hooks/auth/authContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { LoginFormType, LoginFormUserPropsType, userTypeEnum } from "@/types/types";
import { loginRequest } from "@/utils/axiosRequests";
import LoadingPulsePaw from "@/components/LoadingComponents/LoadingPulsePaw";




const LoginForm = ({ formClasses='', inputClasses=''}: Partial<LoginFormUserPropsType>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const mailRef = useRef<HTMLInputElement>(null);
  const pswRef = useRef<HTMLInputElement>(null);
  const { setSitter } = useContext<UserContextType>(UserContext);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const obj: LoginFormType = {
      email: mailRef.current!.value,
      password: pswRef.current!.value,
    };
    try {
      const response = await loginRequest(obj, userTypeEnum.SITTER)
      if (response?.status === 401) {
        setError("Error en usuario/contraseña");
        setLoading(false);
        return;
      }
      if (!response?.data?.payload?.confirmedAccount) {
        return router.push("/error?code=3");
      }
      setSitter(response.data.payload);
      // socket.current.emit("identity", response?.data?.payload?._id);

      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: `Bienvenido ${response?.data?.payload?.username}!`,
      });
      localStorage.setItem('psf-jwt', response?.data?.token);
      const url = `/sitter/${response?.data?.payload?._id}`
      router.push(url);
      setLoading(false);
    } catch (error: any) {
      setError(error?.message);
      setLoading(false);
    }
  };



  return (
    

    <>
      
            <form
              onSubmit={handleSubmit}
            className={`min-h-[200px] flex flex-col justify-center w-full ${formClasses}`}
      >
        {
          loading ? <LoadingPulsePaw containerClasses="text-center mt-10" text="INGRESANDO"/> : 
        <>
              <label className="font-medium text-[20px] mb-3">Usuario</label>
              <br />
              <input
                className={`w-[100%] p-2 my-2 rounded-sm ${inputClasses}`}
                type="text"
                name="email"
                required
                
                ref={mailRef}
                />
              <br />
              <label className="font-medium text-[20px] mb-3">Contraseña</label>
              <br />
              <input
                className={`w-[100%] p-2 my-2 rounded-sm ${inputClasses}`}
                type="password"
                name="password"
                required
                ref={pswRef}
                />
              <br />
              <br />
                <button
                  className={`w-[100%] bg-black text-white
                  font-semibold text-xl p-3 l shadow-2xl hover:scale-105 duration-200`}
                  >
                  Iniciar sesión
                </button>

              <br />
                  </>
            }
            </form>
      
            {error && (
              <div className="w-fit rounded-md text-center p-3 my-3 bg-white/75 text-red-500 text-lg">
                {error}
              </div>
      )}
          </>
  );
};

export default LoginForm;
