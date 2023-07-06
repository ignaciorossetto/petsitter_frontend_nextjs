"use client"
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/hooks/auth/authContext";
import Swal from "sweetalert2";

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
      <>
        <NavBar />
        <section className="h-[130vh] xs:h-[100vh] sm:h-[100vh] flex flex-col items-center">
          <div className='bg-[url("/vacation2.jpg")] bg-cover bg-bottom sm:bg-right-bottom relative h-[500px] w-full'>
            <div className="flex flex-col items-center h-[500px] xs:h-[400px] sm:h-[450px]  md:h-[400px] lg:h-[450px] w-[90%] sm:w-[70%] lg:w-[40%] bg-white shadow-2xl absolute bottom-[-380px] xs:bottom-[-250px] lg:bottom-[-50px] left-[5%] sm:left-[15%] lg:left-[5%] rounded-2xl">
                <h1 className="p-10 font-extrabold text-3xl tracking-wider text-orange-800">LA LIBERTAD DE VIAJAR TRANQUILO!</h1>
                <p className=" px-10 font-normal text-xl"><span className="hidden sm:inline">Tu tranquilidad en cada viaje.</span> <strong className="font-bold text-orange-800">PetSitterFinder</strong> garantiza el cuidado ideal para tus mascotas mientras vos disfrutas.</p>
                <button onClick={handleSearchSitter} className="cursor-pointer self-start ml-10 mt-10 p-5 font-semibold text-2xl border-4 border-orange-800 hover:bg-orange-800 hover:text-white duration-200 hover:rounded-2xl ">Buscar Sitter!</button>
            </div>
          </div>
        </section>
        <Footer />
      </>
  );
}
