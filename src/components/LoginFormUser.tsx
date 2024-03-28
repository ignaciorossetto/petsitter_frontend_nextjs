import React, { FormEvent, useContext, useRef, useState } from "react";
import GoogleIcon from "../../public/icons8-google-1000.svg";
import { UserContext, UserContextType } from "@/hooks/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { LoginFormUserPropsType, LoginFormType, userTypeEnum } from "@/types/types";
import { loginRequest } from "@/utils/axiosRequests";
import LoadingPulsePaw from "./LoadingComponents/LoadingPulsePaw";


const LoginFormUser = ({ containerClasses='', formClasses='', inputClasses='', googleBtnContainerClasses=''}: LoginFormUserPropsType) => {
  const { setUser, socket } = useContext<UserContextType>(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const { elements } = e.currentTarget
      const email = elements.namedItem('email') as HTMLInputElement
      const password = elements.namedItem('password') as HTMLInputElement
    const obj: LoginFormType = {
    email: email.value,
    password: password.value,
    };
    try {
      const response = await loginRequest(obj, userTypeEnum.USER)
      if (response?.status === 401) {
        setError("Error en usuario/contraseña");
        setLoading(false);
        return;
      }
      if (!response?.data?.payload?.confirmedAccount) {
        return router.push("/error?code=3");
      }
        setUser(response.data.payload);
        socket.current.emit("identity", response?.data?.payload?._id);
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
        router.push(`/user/pets`);
    } catch (error: any) {
        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: error.message,
          });
    } finally {
      setLoading(false);

    }
  };


  const handleGoogleBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
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
              
          <div
            className={containerClasses }
            >
                {loading && (
                    <LoadingPulsePaw containerClasses="flex gap-1 items-center justify-center h-[350px] w-full" iconClasses="text-[30px]"/>
                )}
              {!loading && (
                  <>
            <form
                    action=""
                          className={`flex flex-col ${formClasses}`}
                          onSubmit={handlesubmit}
                  >
                    <label
                    className="text-[20px]"
                    >email</label>
                    <input name="email" type="email"  className={`p-3 border-black/25 border-2 text-20px ${inputClasses}`}/>
                    <label
                    className="text-[20px]"
                    >contraseña</label>
                    <input name="password" type="password" className={`p-3 border-black/25 border-2 text-20px ${inputClasses}`} />
          <button
            className="p-3 mt-3 bg-black text-white font-[20px] text-center hover:scale-105 active:scale-100 duration-200"
          >Ingresar</button>
                  </form>
            {error && (
              <div className="w-fit rounded-md text-center p-3 my-3 bg-white/75 text-red-500 text-lg ">
                {error}
              </div>
            )}
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
                      <button
                          onClick={handleGoogleBtn}
                  className={`flex gap-3 w-full bg-white py-2 px-5 items-center justify-center cursor-pointer hover:scale-105 active:scale-100 duration-200 mt-5 ${googleBtnContainerClasses}`}
                  >
                <GoogleIcon className=" w-10 h-10" /> 
                  <span
                className=" text-black font-semibold text-md"
              > Ingresa con Google
              </span>
                  </button>
                  </>
            
            )}
                  </div> 
      </>
 
  );
};

export default LoginFormUser;
