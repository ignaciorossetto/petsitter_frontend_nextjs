"use client"

import { UserContext, UserContextType } from "@/hooks/auth/authContext"
import { ICareOrder, ICareOrderModel, PetType } from "@/types/types"
import { createCareOrder } from "@/utils/axiosRequests"
import { faArrowLeft, faArrowLeftLong, faPaw } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import Swal from "sweetalert2"
import LoadingPulsePaw from "./LoadingComponents/LoadingPulsePaw"

const CARE_ORDER_INITIAL_STATE = {
    dates: [],
    pets: []
}

const OrderForm = () => {
    const [orderObj, setOrderObj] = useState<ICareOrderModel>(CARE_ORDER_INITIAL_STATE)
    const [loading, setLoading] = useState(false)
    const { user, setCareOrder } = useContext<UserContextType>(UserContext) 
    const router = useRouter()

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "startDate") {
            const startDate = e.target.value;
            setOrderObj(prev => ({
              ...prev,
              dates: [startDate, prev.dates[1]] // Update start date while keeping end date unchanged
            }));
        }
        if (e.target.name === "endDate") {
            const endDate = e.target.value;
            setOrderObj(prev => ({
              ...prev,
              dates: [prev.dates[0], endDate] // Update start date while keeping end date unchanged
            }));
        }
      };

    const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const p = [...orderObj?.pets!] 
            p.push(e.target.value )
            setOrderObj((prev:ICareOrderModel)=> ({...prev, pets: p as string[]}))   
        } 
        if (!e.target.checked) {
            const p: string[] = [...orderObj.pets as string[]].filter((element)=> element !== e.target.value)
            setOrderObj((prev:ICareOrderModel)=> ({...prev, pets: p}))  
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        if (orderObj?.pets?.length === 0) {
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
        const jwt = localStorage.getItem("psf-jwt")

        const obj = {
            ownerId: user?._id,
            pets: orderObj.pets,
            contactedSitters: [],
            dates: [orderObj?.dates[0], orderObj?.dates[1]],
        }
        let cancelToken = axios.CancelToken.source();
        try {
            const response = await createCareOrder(jwt, obj, cancelToken)
            setCareOrder({...orderObj, _id: response._id} )
            Swal.fire({
                title: 'Órden de cuidado creada!',
                toast: true,
                position: "top-right",
                icon: "success",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false
            })
            router.push('/user/get-sitter')
        } catch (error) {
            Swal.fire({
                title: 'Hubo un error creando la órden!',
                toast: true,
                position: "top-right",
                icon: "error",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false
            })
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
              className='mt-5 min-h-[700px] min-w-[600px] flex flex-col gap-3 bg-white/30 p-5 rounded-xl text-[18px] sm:text-[20px]'
              onSubmit={handleSubmit}

          >
              {
                  loading && <LoadingPulsePaw
                      text="Loading..."
                      containerClasses="text-center mt-20"
                  />
              }
              {
                  !loading &&
                  <>
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
                      name="startDate"
                      id=""
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleDateChange}
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
                    name="endDate"
                  id=""
                  min={orderObj.dates[0] || new Date().toISOString().split("T")[0]}
                  onChange={handleDateChange}

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
                  Crear órden! <FontAwesomeIcon icon={faPaw}/>
                      </button>
                  </>
                      
              }
          </form>
    </div>
  )
}

export default OrderForm