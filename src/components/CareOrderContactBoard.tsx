"use client"
import { CareOrderStatus, ICareOrderModel, ISitter, PaymentStatus } from '@/types/types'
import { getContactedSitters, updateCareOrder } from '@/utils/axiosRequests'
import { useRouter } from 'next/navigation'
import React, { Dispatch, useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import LoadingPulsePaw from './LoadingComponents/LoadingPulsePaw'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faInfo, faPaw, faTrash } from '@fortawesome/free-solid-svg-icons'
import { haversine_distance } from '@/utils/utilsFunctions'
import { UserContext } from '@/hooks/auth/authContext'

const CareOrderContactBoard = ({
    info,
    setInfo,
    setCareOrder,
    id
}
    :
    {
        info: ICareOrderModel | null,
        setInfo: Dispatch<ICareOrderModel>,
        setCareOrder: Dispatch<ICareOrderModel>,
        id: string | string[]
     }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [contactedSitters, setContactedSitters] = useState([])
    const {user, setUser} = useContext(UserContext)

    const handleContactSitter = () => {
        if (info) {
            setCareOrder(info)
        }
        router.push(`/user/get-sitter?careOrder=${id}`)
    }

    useEffect(() => {
        const fetchContactedSitters = async () => {
            setLoading(true)
            try {
                const obj = {
                    contactedSitters: info?.contactedSitters
                }
                const jwt = localStorage.getItem("psf-jwt")
                const data = await getContactedSitters(jwt, obj)
                setContactedSitters(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                Swal.fire({
                    title: "No se cargaron los chats correctamente",
                    toast: true,
                    icon: "error",
                    position: "top-right",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            
        }
        if (info?.contactedSitters && info?.contactedSitters.length > 0) {
            fetchContactedSitters()
        }
    }, [info?.contactedSitters])

    const handleDeleteContactedSitter = async(id: string) => {
        setLoading(true)
        const obj = {
            $pull:
            {
                    contactedSitters: id
            }
          }
        
        try {
            const jwt = localStorage.getItem('psf-jwt')
            if (info?._id) {
                const data: ICareOrderModel = await updateCareOrder(jwt, info?._id, obj)
                setInfo(data)
                setContactedSitters(data?.contactedSitters as [])
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            router.push(`/error?code=1`)
            setLoading(false)
        }
    }

    const handleMercadoPagoBtn = async(sitterId: string) => {
        setLoading(true)
        try {
            const obj = {
                ownerId: info?.ownerId,
                confirmed: true,
                sitter: sitterId,
                pricePerDay: 5000,
                status: CareOrderStatus.CONFIRMED,
                'paymentInfo.status': PaymentStatus.APPROVED
            }
            const jwt = localStorage.getItem('psf-jwt')
            const response = await updateCareOrder(jwt, info?._id as string, obj, true)
            setInfo(response[0])
            setUser(response[1])
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

  return (
    <div
                              className='w-[40%] h-auto bg-white rounded-xl shadow-2xl shadow-black/40 p-5  overflow-y-auto '
                          >
                              <div
                              className='text-center text-[35px] font-semibold'
                              >
                                  cuidadores
                              </div>
                              <div
                              className='p-5'
                              >
                                  <button
                                          onClick={handleContactSitter}
                                          className='p-5 text-[20px] bg-black  font-semibold text-white hover:scale-105 active:scale-100 duration-200'
                                  >
                                      {contactedSitters.length === 0 ? "Contactar cuidador" : "Contactar otro cuidador"} <FontAwesomeIcon icon={faPaw}/>
                                      
                                  </button>
                                  
                                  {info?.contactedSitters?.length === 0 &&
                                      <>
                                      <div
                                          className='text-[25px] my-5'
                                      >Todavia no contactaste a ningun cuidador!</div>
                                      
                                          </>
                                  }
                                  
                              </div>
                                  <div
                                  className='w-full h-[1px] bg-black'
                              />
                              <div
                              className='mt-10 flex flex-col gap-5 w-[100%]'
                              >
                                  
                              { loading && <LoadingPulsePaw containerClasses='text-center mt-20'/>}
                                {!loading && contactedSitters?.length! > 0 && 
                                      contactedSitters.map((e: ISitter, index) =>
                                          <div
                                              key={e._id}
                                              className={`flex justify-between p-10  w-[100%]   min-h-[200px] ${index % 2 === 0 ? "bg-gray-200/50" : "bg-gray-300/50"}    hover:shadow-2xl duration-200`}
                                          >
                                              
                                              <div
                                              className='flex flex-col justify-between'
                                              >
                                                  
                                          
                                        <div
                                      
                                              className='flex'
                                              >
                                              <Image
                                                src={e?.profileImg || "/sitter-landing.jpg"}
                                                alt="profile-image"
                                                height={100}
                                                width={100}
                                                className="object-fit object-center rounded-lg h-[100px] w-[100px] object-cover"
                                              />
                                              <div
                                              className='px-3 flex flex-col gap-3'
                                              >
                                                  <div
                                                      className='text-[20px] font-semibold'
                                                  >{e?.username}</div>
                                                  <div>${e?.price || 5000} x día</div>
                                                      <div
                                                          className='italic text-[15px]'
                                                      >{haversine_distance(user?.fullAddress?.latLng, { lat: e?.location?.coordinates[1], lng: e?.location?.coordinates[0] }).toFixed()} km de distancia</div>
                                              </div>
                                                  </div>
                                                  <button
                                                  className='mt-5 w-[300px] text-[19px] font-semibold text-white flex justify-center bg-sky-500 p-3'
                                                  onClick={()=>handleMercadoPagoBtn(e._id)}
                                                  >
                                                          Mercado Pago
                                                  </button>
                                                  </div>
                                              <div
                                              className='flex flex-col gap-5'
                                              >
                                                  <div
                                                      className='flex gap-2 w-[95px] items-baseline justify-center hover:scale-110 active:scale-100 duration-200 cursor-pointer p-2 rounded-xl bg-white text-[18px]'
                                                  >
                                                      <FontAwesomeIcon icon={faCommentDots} />
                                                      <span>Chat...</span>
                                                  </div>
                                                  <div
                                                      className='flex gap-2 w-[95px] items-baseline justify-center hover:scale-110 active:scale-100 duration-200 cursor-pointer p-2 rounded-xl bg-white text-[18px]'
                                                  >
                                                      <FontAwesomeIcon icon={faInfo} />
                                                      <span>Más...</span>
                                                  </div>
                                                  <button
                                                      className='flex gap-2 w-[95px] items-baseline justify-center hover:scale-110 active:scale-100 duration-200 cursor-pointer p-2 rounded-xl bg-white text-[18px] text-red-500'
                                                      onClick={()=> handleDeleteContactedSitter(e?._id)}
                                                  >
                                                      <FontAwesomeIcon icon={faTrash} />
                                                  </button>
                                        </div>
                                    </div>
                                            )
                                   }
                                   </div>
                        </div>
  )
}

export default CareOrderContactBoard