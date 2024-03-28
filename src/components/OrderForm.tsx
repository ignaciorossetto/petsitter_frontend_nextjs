"use client"

import { UserContext, UserContextType } from "@/hooks/auth/authContext"
import { faArrowLeft, faArrowLeftLong, faPaw } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import Swal from "sweetalert2"

const OrderForm = () => {
    const [orderObj, setOrderObj] = useState<{initialDate:string, endDate:string, pets: any[]}>({
        initialDate: "",
        endDate: "",
        pets: []
    })

    const { user } = useContext<UserContextType>(UserContext) 

    const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const p = [...orderObj.pets]
            p.push(e.target.value)
            setOrderObj((prev)=> ({...prev, pets: p}))   
        } 
        if (!e.target.checked) {
            const p = [...orderObj.pets].filter((element)=> element !== e.target.value)
            setOrderObj((prev)=> ({...prev, pets: p}))  
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (orderObj.pets.length === 0) {
            Swal.fire({
                title: 'Debes seleccionar una mascota',
                toast: true,
                position: "top-right",
                icon: "error",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false
            })
            return
        }
    }

  return (
      <div
      className='min-h-[500px] relative w-full flex flex-col items-center mt-16 bg-violet-400/75 p-10'
      >
          <Link
                className="absolute t-0 left-2 -mt-8 hover:scale-110 active:scale-100 duration-200"
              href='/user/pets'>
              <FontAwesomeIcon icon={faArrowLeftLong} size="2xl" /> <span
              className="text-[18px] font-bold"
              >volver</span>
          </Link>
          <form
              action=""
              className='mt-5 flex flex-col gap-3 bg-white/30 p-5 rounded-xl text-[18px] sm:text-[20px]'
              onSubmit={handleSubmit}

          >
              <h2
              className="text-center text-[35px] font-normal "
              >
                  Orden de cuidado
              </h2>
              <div
              className="flex flex-col gap-3 lg:block p-5 bg-white/50"
              >
                  <h2
                      className="text-[24px] font-semibold text-center mb-5"
                  >Fechas</h2>
              <label
                  htmlFor=""
                  className=''
              >
                  desde
              </label>
                  <input
                  required
                  className='mx-5 p-3'
                      placeholder='desde'
                      type='date'
                      name=""
                      id=""
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e)=>setOrderObj((prev) => ({...prev, initialDate: e.target.value}))}
                  />
              <label
                  htmlFor=""
                  className=''
              >
                  hasta 
              </label>
                  <input
                  required
                  className='mx-5 p-3'
                    placeholder='hasta'
                    type='date'
                    name=""
                  id=""
                  min={orderObj.initialDate || new Date().toISOString().split("T")[0]}
                  onChange={(e)=>setOrderObj((prev) => ({...prev, endDate: e.target.value}))}

              />
                  
              </div>
              <div
                  className="bg-white/50 p-5"
              >
                  
              <h2
                  className="text-[24px] font-semibold text-center my-5 "
                  >Mascotas</h2>
              <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 content-center justify-center"
              >
                  
            {
                user && user!.pets?.length! > 0 && user.pets!.map((p: any) =>
                <div
                key={p._id}
                className="flex gap-5 items-center"
                >   
                              <Image
                                src={p.images[0]}
                                alt="profile-image"
                                height={75}
                                width={75}
                                className="object-fit object-center rounded-lg h-[75px] w-[75px] object-cover"
                                />
                              
                        <input
                            className="w-4 h-4 "
                            type="checkbox"
                            key={p._id}
                            value={p._id}
                            onChange={handleSelectChange} />
                          
                          <label  htmlFor="">  {p.name}</label>
                          
                    </div>
                
                )
            }
                </div>
            </div>
              <button
              className="py-3 px-4 duration-200 hover:scale-105 active:scale-100 bg-black/75 text-white text-[20px] text-center"
              >
                  confirmar! <FontAwesomeIcon icon={faPaw}/>
            </button>
          </form>
    </div>
  )
}

export default OrderForm