"use client";
import {
  faCommentDots,
  faUser,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
    faDashboard,
  faPaw,
  faRightFromBracket,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useContext, Suspense } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { getGoogleLoggedInUserInfo } from "@/utils/axiosRequests";
import { AdminContext, AdminContextType } from "@/hooks/auth/adminContext";
import LoadingPulsePaw from "../LoadingComponents/LoadingPulsePaw";

const NavBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const access_token: string | null = searchParams.get("access_token");
  const [loading, setLoading] = useState<boolean>(false);
  const [showNavBarModal, setShowNavBarModal] = useState<boolean>(false);
  const { admin, setAdmin } = useContext<AdminContextType>(AdminContext);



  const handleLogOutBtn = () => {
    // socket.current.emit('logout')
    setAdmin(null);
    localStorage.setItem('psf-admin-jwt', '')
    
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: 'success',
      title: 'Nos vemos pronto!'
    });
    return router.push('/');
  };

  const getGoogleLoggedUserInfo = async () => {
    try {
      const { payload } = await getGoogleLoggedInUserInfo(access_token)
      console.log('payload', payload);
      localStorage.setItem('psf-jwt', access_token || '')
      setAdmin(payload);
      setLoading(false);
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: `Bienvenido ${payload.username}!`,
      });
      // socket.current.emit("identity", payload._id);
    } catch (error) {
      console.log('error', error);
      router.push("/error?code=1");
    }
  };


  return (
    <Suspense fallback={<LoadingPulsePaw />}>
    <nav className="z-10 shadow-2xl w-full bg-white rounded-2xl  h-[8rem] flex justify-between items-center p-10 mb-5 sticky top-0">
      <div
        className="sm:hidden cursor-pointer hover:scale-110"
        onClick={() => setShowNavBarModal((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
          className="mr-5 w-7 h-7"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </div>
      <h1 className="relative flex gap-2 items-center justify-center font-semibold text-xl sm:text-2xl md:text-3xl tracking-widest cursor-pointer text-orange-800">
        <Link href={'/admin'}>PetSitterFinder</Link>
        <p className="absolute top-[28px] right-0 text-md italic font-light text-green-900">ADMIN</p>
        <FontAwesomeIcon icon={faPaw} size="lg"/>
      </h1>
      <div className="hidden sm:flex gap-4 font-medium text-black ">
        {loading ? (
          <div className="w-[125px] pr-12">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="w-10 h-10 text-center"
            />
          </div>
        ) : admin ? (
          <>
            <span
              className="cursor-pointer
                hover:scale-110 duration-200 bg-violet-300 p-3 rounded-lg"
            >
              <Link href="/admin/dashboard">
                <FontAwesomeIcon size="xl" icon={faDashboard}  className="text-black"/>
              </Link>
            </span>
            <span
              className={`cursor-pointer
                hover:scale-110 duration-200 p-3 rounded-lg`}
            >
              <Link href={`/admin/chat`}>
                <FontAwesomeIcon size="xl" icon={faCommentDots}  className="text-black"/>
              </Link>
            </span>
            <span
              className={`cursor-pointer
                hover:scale-110 duration-200 p-3 rounded-lg`}
            >
              <button onClick={handleLogOutBtn}>
                <FontAwesomeIcon
                  size="xl"
                  icon={faRightFromBracket} className="text-black"
                />
              </button>
            </span>
            {admin?.profileImg ? (
              <span
                className="cursor-pointer
                    hover:scale-110 duration-200 rounded-lg hover:shadow-2xl"
              >
                <Link href={`/admin/profile`}>
                  <Image
                    src={admin?.profileImg}
                    alt="profile-image"
                    height={51}
                    width={51}
                    className="object-fit object-center rounded-lg h-[51px] w-[51px] object-cover"
                  />
                </Link>
              </span>
            ) : (
              <span
                className={`cursor-pointer
                    hover:scale-110 duration-200  p-3 rounded-lg`}
              >
                <Link href={`/admin/profile`}>
                  <FontAwesomeIcon size="xl" icon={faUser} className="text-black"/>
                </Link>
              </span>
            )}
          </>
        ) : (
          
                 
            <>
            <Link 
            href={`/admin/login`} 
            className={`cursor-pointer hover:scale-110 duration-200  p-4 font-semibold text-md rounded-lg`}>
                Ingresar
          </Link>
         
        </>
        
        
          
        )}
      </div>
      {showNavBarModal && (
        <div className="sm:hidden fixed left-0 top-0 w-full h-full bg-white/50 flex z-10">
          <div className="menuContainer  w-44 h-full bg-white border-r-2 border-orange-400/25 p-5 flex flex-col justify-between">
            <div className="">
              <FontAwesomeIcon
                icon={faXmarkCircle}
                size="xl"
                className="cursor-pointer align-baseline justify-start"
                onClick={() => setShowNavBarModal((prev) => !prev)}
              />
              <h1 className=" text-center text-xl font-semibold mt-4">MENU</h1>
              <br />
              <br />
              {admin && (
                <>
                <Link href={`/admin/chat`}>
                  <h3 className="font-medium mt-1 p-2 cursor-pointer rounded-xl duration-150 hover:bg-slate-300">
                    <FontAwesomeIcon size="xl" icon={faCommentDots} />{" "}
                    Chat
                  </h3>
                </Link>
                
                </>
              )}
            </div>
            <div className="pb-5 ">
              {admin ? (
                <>
                  <Link href={`/admin/profile`}>
                    <h3 className="font-normal hover:scale-105 cursor-pointer">
                      <FontAwesomeIcon icon={faUser} size="xl"/> Configuración
                    </h3>
                  </Link>
                  <Link href={`/admin`}>
                    <h3
                      className="font-normal hover:scale-105 cursor-pointer"
                      onClick={handleLogOutBtn}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} size="xl"/> Log out
                    </h3>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={`/admin/login`}>
                    <h3 className="font-normal hover:scale-105 cursor-pointer">
                      Ingresar
                    </h3>
                  </Link>
                  
                </>
              )}
              <div className="text-xs mt-5">
                <p className="text-center">© 2023</p>
                <p className="text-center">PetSitterFinder.com.ar™</p>
              </div>
            </div>
          </div>
          <div
            className="menuContainer w-8/12 h-full bg-transparent"
            onClick={() => setShowNavBarModal((prev) => !prev)}
          />
        </div>
      )}
      </nav>
      </Suspense>
  );
};

export default NavBar;
