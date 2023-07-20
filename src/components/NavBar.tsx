"use client";
import {
  faCommentDots,
  faMessage,
  faUser,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faPaw,
  faRightFromBracket,
  faShop,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "@/hooks/auth/authContext";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";

const NavBar = ({type}:any) => {
  const searchParams = useSearchParams();
  const googleLogin: any = searchParams.get("login-google");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showNavBarModal, setShowNavBarModal] = useState(false);
  const { user, setUser, socket } = useContext(UserContext);



  const handleLogOutBtn = () => {
    console.log('hitted')
    socket.current.emit('logout')
    setUser(null);
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: 'success',
      title: 'Nos vemos pronto!'
    });
    if (type==='sitter') return router.push('/sitter');
    router.push('/');
  };

  const getGoogleLoggedUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/login`, {withCredentials:true}
      );
      setUser(response.data.payload);
      setLoading(false);
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: `Bienvenido ${response.data.payload.username}!`,
      });
      socket.current.emit("identity", response.data.payload._id);
    } catch (error) {
      router.push("/error?code=1");
    }
  };

  useEffect(() => {
    if (googleLogin) {
        setLoading(true);
        getGoogleLoggedUserInfo()
    }
  }, [])

  return (
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
      <h1 className="relative flex gap-2 items-center justify-center text font-semibold  text-2xl md:text-3xl tracking-widest cursor-pointer text-orange-800">
        <Link href={type === 'sitter' ? '/sitter' : '/'}>PetSitterFinder</Link>
        {type==='sitter' && <p className="absolute top-[28px] right-0 text-md italic font-light text-green-900">Sitters</p>}
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
        ) : user ? (
          <>
          {
            type!=='sitter' &&
            <span
              className="cursor-pointer
                hover:scale-110 duration-200 bg-violet-300 p-3 rounded-lg"
            >
              <Link href="/user/pets">
                <FontAwesomeIcon size="xl" icon={faPaw}  className="text-black"/>
              </Link>
            </span>
          }
            <span
              className={`cursor-pointer
                hover:scale-110 duration-200 ${type==='sitter' ? 'bg-gradient-to-tr from-lime-400 to-emerald-300' : 'bg-violet-300'} p-3 rounded-lg`}
            >
              <Link href={`${type==='sitter' ? '/sitter/chat' : '/user/chat'}`}>
                <FontAwesomeIcon size="xl" icon={faCommentDots}  className="text-black"/>
              </Link>
            </span>
            <span
              className={`cursor-pointer
                hover:scale-110 duration-200 ${type==='sitter' ? 'bg-gradient-to-tr from-lime-400 to-emerald-300' : 'bg-violet-300'} p-3 rounded-lg`}
            >
              <button onClick={handleLogOutBtn}>
                <FontAwesomeIcon
                  size="xl"
                  icon={faRightFromBracket} className="text-black"
                />
              </button>
            </span>
            {user?.profileImg ? (
              <span
                className="cursor-pointer
                    hover:scale-110 duration-200 rounded-lg hover:shadow-2xl"
              >
                <Link href={`${type==='sitter' ? `/sitter/${user._id}` : '/user'}`}>
                  <Image
                    src={user?.profileImg}
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
                    hover:scale-110 duration-200 ${type==='sitter' ? 'bg-gradient-to-tr from-lime-400 to-emerald-300' : 'bg-violet-300'} p-3 rounded-lg`}
              >
                <Link href={`${type==='sitter' ? `/sitter/${user._id}` : '/user'}`}>
                  <FontAwesomeIcon size="xl" icon={faUser} className="text-black"/>
                </Link>
              </span>
            )}
          </>
        ) : (
          
          
            
            <>
            <Link 
            href={`${type==='sitter' ? '/sitter/login' : '/login'}`} 
            className={`cursor-pointer hover:scale-110 duration-200 ${type==='sitter' ?  'bg-gradient-to-tr from-lime-400 to-emerald-300' : 'bg-violet-300' } p-4 font-semibold text-md rounded-lg`}>
                Ingresar
          </Link>
          <Link 
          href={`${type==='sitter' ? '/sitter/sign-up' : '/login'}`} 
          className={`cursor-pointer hover:scale-110 duration-200 ${type==='sitter' ?  'bg-gradient-to-tr from-lime-400 to-emerald-300' : 'bg-violet-300' } p-4 font-semibold text-md rounded-lg`}>
            Registrar
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
              {user && (
                <>
                <Link href={type==='sitter' ? '/sitter/chat' : `/user/chat`}>
                  <h3 className="font-medium mt-1 p-2 cursor-pointer rounded-xl duration-150 hover:bg-slate-300">
                    <FontAwesomeIcon size="xl" icon={faCommentDots} />{" "}
                    Chat
                  </h3>
                </Link>
                {
                  type!=='sitter' && 
                
                <Link href="#">
                  <h3 className="font-medium mt-1 p-2 cursor-pointer align-center rounded-xl duration-150 hover:bg-slate-300">
                  <FontAwesomeIcon size="xl" icon={faShop} />{" "}
                    Tienda
                  </h3>
                </Link>
                }
                {
                  type!=='sitter' && 
                
                <Link href="/user/pets">
                  <h3 className="font-medium mt-1 hover:scale-105 p-2 cursor-pointer text-center rounded-xl duration-150 bg-violet-200 hover:bg-slate-300">
                    Buscar sitter!
                  </h3>
                </Link>}
                </>
              )}
            </div>
            <div className="pb-5 ">
              {user ? (
                <>
                  <Link href={type==='sitter' ? `/sitter/${user._id}` : `/user`}>
                    <h3 className="font-normal hover:scale-105 cursor-pointer">
                      <FontAwesomeIcon icon={faUser} size="xl"/> Configuración
                    </h3>
                  </Link>
                  <Link href={type==='sitter' ? `/sitter` : `/`}>
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
                  <Link href={type==='sitter' ? `/sitter/login` : `/login`}>
                    <h3 className="font-normal hover:scale-105 cursor-pointer">
                      Ingresar
                    </h3>
                  </Link>
                  <Link href={type==='sitter' ? `/sitter/sign-up` : `/sign-up`}>
                    <h3 className="font-normal hover:scale-105 cursor-pointer">
                      Registrar
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
  );
};

export default NavBar;
