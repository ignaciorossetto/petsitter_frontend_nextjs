import React, { FormEvent, useContext, useRef, useState } from "react";
import GoogleIcon from "../../public/icons8-google-1000.svg";
import { UserContext, UserContextType } from "@/hooks/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { LoginFormPropsType, LoginFormType } from "@/types/types";
import { loginRequest } from "@/utils/axiosRequests";


const LoginForm = ({ type }: LoginFormPropsType) => {
  const mailRef = useRef<HTMLInputElement>(null);
  const pswRef = useRef<HTMLInputElement>(null);
  const { setUser, socket } = useContext<UserContextType>(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const handleLoginBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    const obj: LoginFormType = {
      email: mailRef.current!.value,
      password: pswRef.current!.value,
    };
    try {
      const userType = type === 'sitter' ? 'sitter' : undefined;
      const response = await loginRequest(obj, userType)
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
      const url = type === 'sitter' ? `/sitter` : `/`
      router.push(url);
    } catch (error: any) {
      setError(error?.message);
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
    <div className="flex flex-1 rounded-xl">
      <div className='hidden md:block w-6/12 bg-white bg-[url("/sitter-4.jpg")] bg-cover bg-right rounded-l-xl' />

      <div
        className={`flex flex-col items-center w-full rounded-xl ${
          type === "sitter"
            ? "bg-gradient-to-tr from-lime-400 to-emerald-300"
            : 'bg-[url("/gradient.png")]'
        } bg-cover md:w-6/12  md:rounded-l-none  `}
      >
        <h1 className="text-[35px] p-10">
          {" "}
          {type === "sitter" && "Sitters "}Login
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
            <form>
              <label className="font-medium text-[20px] mb-5">Usuario</label>
              <br />
              <input
                className="p-2 my-4 rounded-sm"
                type="text"
                name="email"
                required
                
                ref={mailRef}
              />
              <br />
              <label className="font-medium text-[20px] mb-5">Contraseña</label>
              <br />
              <input
                className="p-2 my-4 rounded-sm"
                type="password"
                name="password"
                required
                ref={pswRef}
              />
              <br />
              <br />
                <button
                  className={`w-full ${type === 'sitter' ? 'bg-green-800 text-white' : 'bg-violet-200 text-black'}
                    bg-left-top bg-cover font-semibold text-xl p-3 rounded-2xl shadow-2xl hover:scale-105 duration-200`}
                  onClick={handleLoginBtn}
                >
                  Iniciar sesión
                </button>

              <br />
            </form>
            {error && (
              <div className="w-fit rounded-md text-center p-3 my-3 bg-white/75 text-red-500 text-lg">
                {error}
              </div>
            )}
            <br />
            {type !== "sitter" && (
              <button
                onClick={handleGoogleBtn}
                className="bg-violet-200 text-black bg-cover font-semibold text-md p-3 shadow-2xl   rounded-2xl flex items-center justify-between w-[217px] hover:scale-105 duration-200 "
              >
                <GoogleIcon className="bg-white w-10 h-10" /> Ingresa con Google
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
