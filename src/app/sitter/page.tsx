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
    router.push('/sitter/sign-up')
  }

  return (
      <>
        <NavBar type='sitter'/>
        <section className="h-[130vh] xs:h-[100vh] sm:h-[100vh] flex flex-col items-center">
          <div className='bg-[url("/sitter-landing.jpg")] bg-cover bg-right-bottom sm:bg-right-center relative h-[500px] w-full'>
            <div className="flex flex-col items-center h-[500px] xs:h-[400px] sm:h-[450px]  md:h-[400px] lg:h-[450px] w-[90%] sm:w-[70%] lg:w-[40%] bg-white shadow-2xl absolute bottom-[-380px] xs:bottom-[-250px] lg:bottom-[-50px] left-[5%] sm:left-[15%] lg:left-[5%] rounded-2xl">
                <h1 className="p-10 font-extrabold text-3xl tracking-wider text-orange-800">GANAR DINERO CUIDANDO MASCOTAS!</h1>
                <p className=" px-10 font-normal text-xl"><span className="hidden sm:inline">Imaginaste <span className="font-bold">ganar dinero</span> mientras cuidas una mascota?</span> <strong className="font-bold text-orange-800">PetSitterFinder</strong> lo hace posible!</p>
                <button onClick={handleSearchSitter} className="cursor-pointer self-start sm:mx-5 sm: ml-5 mr-5 mt-10  p-5 font-semibold text-2xl border-4 border-orange-800 hover:bg-orange-800 hover:text-white duration-200 hover:rounded-2xl ">Registrate como cuidador!</button>
            </div>
          </div>
        </section>
        <Footer />
      </>
  );
}
