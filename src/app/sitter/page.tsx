"use client"
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import LoginFormSitter from "@/components/LoginFormSitter";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  const router = useRouter()

  const handleSitterRegister = () => {
    router.push('/sitter/sign-up')
  }

  return (
      <Suspense>
        <NavBar type='sitter'/>
        <section className="h-[130vh] xs:h-[100vh] sm:h-[100vh] flex flex-col items-center">
          <div className='bg-[url("/sitter-landing.jpg")] bg-cover bg-right sm:bg-right-center relative h-[650px] w-full'>
            <div className="flex flex-col items-center h-[750px] xxs:h-[600px] xs:h-[500px] sm:h-[500px]  md:h-[500px] lg:h-[800px] w-[90%] sm:w-[70%] lg:w-[45%] bg-white shadow-2xl absolute bottom-[-380px] xs:bottom-[-250px] lg:top-[50px] left-[5%] sm:left-[15%] lg:left-[5%] rounded-2xl">
                <h1 className="p-10 font-extrabold text-3xl tracking-wider text-orange-800">GANAR DINERO CUIDANDO MASCOTAS!</h1>
                <p className=" px-8 w-full lg:w-[87%] font-normal text-xl"><span className="inline">Imaginaste <span className="font-bold">ganar dinero</span> mientras cuidas una mascota?</span> <strong className="font-bold text-orange-800">Pimi App</strong> lo hace posible!</p>
                <div className="hidden min-h-10 lg:block self-center ml-5">
                <LoginFormSitter formClasses="mt-10" inputClasses="border-2 border-black -my-2"/>
            
            <div
            className="flex gap-2 items-center justify-center"
            >
              <span
              className="w-[150px] h-[2px] bg-black"
              ></span>
              <span
              className="font-semibold"
              >
                O
              </span>
              <span
              className="w-[150px] h-[2px] bg-black"
              ></span>
            </div>
                <button onClick={handleSitterRegister} className="cursor-pointer self-start sm:mx-5 sm: ml-5 mr-5 mt-10  p-5 font-semibold text-2xl border-4 border-orange-800 hover:bg-orange-800 hover:text-white duration-200 hover:rounded-2xl ">Registrate como cuidador!</button>
            </div>
          <div
            className=" mt-10 flex flex-col items-center lg:hidden"
            >
              <Link
                href={'/sitter/login'}
              className="hover:scale-110 active:scale-100 text-center text-[25px] font-semibold"
              >
                Ingresa
              </Link>
          <div
            className="flex my-5 gap-2 items-center justify-center"
            >
              <span
              className="w-[95px] h-[2px] bg-black"
              ></span>
              <span
              className="font-semibold"
              >
                O
              </span>
              <span
              className="w-[95px] h-[2px] bg-black"
              ></span>
            </div>
                <button onClick={handleSitterRegister} className="hidden sm:block cursor-pointer self-start sm:mx-5 sm: ml-5 mr-5  p-5 font-semibold text-2xl border-4 border-orange-800 hover:bg-orange-800 hover:text-white duration-200 hover:rounded-2xl ">Registrate como cuidador!</button>
                <button onClick={handleSitterRegister} className="block sm:hidden cursor-pointer p-3 font-semibold text-2xl border-4 border-orange-800 hover:bg-orange-800 hover:text-white duration-200 hover:rounded-2xl ">Registrate</button>
            </div>
          </div>
          </div>
        </section>
        <Footer />
      </Suspense>
  );
}
