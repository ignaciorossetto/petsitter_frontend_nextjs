"use client"
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { Suspense, useContext } from "react";
import { UserContext } from "@/hooks/auth/authContext";
import Swal from "sweetalert2";
import LoginFormUser from "@/components/LoginFormUser";

export default function Home() {
  const {user} = useContext(UserContext)
  const router = useRouter()

  const handleSearchSitter = () => {
    if(!user){
      return Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'error',
        title: 'Debes logearte primero!'
      });
    }
    router.push('/user/pets')
  }

  return (
      <Suspense>
        <NavBar />
        <section className="h-[100vh] xs:h-[100vh] sm:h-[100vh] flex flex-col items-center relative">
          <div className='bg-[url("/vacation2.jpg")] bg-cover bg-bottom sm:bg-right-bottom relative h-[650px] w-full'>
          <div className={`flex flex-col items-center 
            ${!user && `
            h-[450px] xs:h-[350px] sm:h-[350px]  md:h-[350px] lg:h-[750px] w-[90%] sm:w-[70%] lg:w-[40%]
            bottom-[-50px] xs:bottom-[-25px] md:bottom-[-200px] lg:bottom-[-150px] 
            `} 
            ${user && `
            h-[450px] lg:h-[500px] w-[90%] sm:w-[70%] lg:w-[40%]
            bottom-[-50px] xs:bottom-[-25px] md:bottom-[-150px] lg:bottom-[-150px] 
            `} bg-white shadow-2xl absolute left-[5%] sm:left-[15%] lg:left-[5%] rounded-2xl`}>
                <h1 className="p-10 font-extrabold text-3xl tracking-wider text-orange-800">LA LIBERTAD DE VIAJAR TRANQUILO!</h1>
            <p className=" px-10 font-normal text-xl"><span className="hidden sm:inline">Tu tranquilidad en cada viaje.</span> <strong className="font-bold text-orange-800">Pimi App</strong> garantiza el cuidado ideal para tus mascotas mientras vos disfrutas.</p>
            {
            !user &&
            <LoginFormUser
            containerClasses="hidden lg:flex flex-col mt-5 p-5 rounded-xl bg-transparent"
            formClasses="gap-4"
            />
            }
            { user && <button onClick={handleSearchSitter} className="hidden xxs:block cursor-pointer self-start ml-10 mt-10 p-5 font-semibold text-2xl border-4 border-orange-800 hover:bg-orange-800 hover:text-white duration-200 hover:rounded-2xl ">Buscar Cuidador!</button>}
          </div>
          {
            !user &&
            <>
            <LoginFormUser
            containerClasses="hidden md:flex lg:hidden flex-col mt-5 p-5 rounded-xl  bg-white/75 absolute  sm:top-[10px] sm:right-[25%] md:right-[25%] w-[50%]"
            formClasses="gap-4"
            />
            </>
          }
            </div>
      </section>
      {
        !user &&
        <LoginFormUser
          containerClasses="flex relative z-20 md:hidden flex-col -mt-32 p-5 rounded-xl  bg-transparent"
          formClasses="gap-4"
        />
      }
        <Footer />
      </Suspense>
  );
}
