"use client"
import Footer from '@/components/Footer'
import LoadingPulsePaw from '@/components/LoadingComponents/LoadingPulsePaw'
import NavBar from '@/components/NavBar'
import { UserContext } from '@/hooks/auth/authContext'
import { CareOrderStatus, ICareOrderModel, ISitter, PetType } from '@/types/types'
import { getContactedSitters, getPendingOngoingCareOrder } from '@/utils/axiosRequests'
import { parseCareOrderBtnClass, parseCareOrderStatus } from '@/utils/utilsFunctions'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faInfo, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const CareOrderDashboardView = () => {
    const { id } = useParams()
    const [info, setInfo] = useState<ICareOrderModel | null>(null)
    const [contactedSitters, setContactedSitters] = useState([])
    const [loadingFetchSitters, setLoadingFetchSitters] = useState(false)
    const {user, setCareOrder} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const jwt = localStorage.getItem("psf-jwt")
    useEffect(() => {
        const fetchInfo = async () => {
            let cancelToken = axios.CancelToken.source();
            const response: ICareOrderModel = await getPendingOngoingCareOrder(jwt, id as string, cancelToken)
            setInfo(response)
        }
        fetchInfo()
    }, [id])
    const handleContactSitter = () => {
        if (info) {
            setCareOrder(info)
        }
        router.push(`/user/get-sitter?careOrder=${id}`)
    }

    useEffect(() => {
        const fetchContactedSitters = async () => {
            setLoadingFetchSitters(true)
            try {
                const obj = {
                    contactedSitters: info?.contactedSitters
                }
                const data = await getContactedSitters(jwt, obj)
                setContactedSitters(data)
                setLoadingFetchSitters(false)
            } catch (error) {
                setLoadingFetchSitters(false)
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
    }, [info?.contactedSitters, jwt])

  return (
      <>
          <NavBar />
          <main
          className='min-h-[500px]'
          >
              { loading && <LoadingPulsePaw containerClasses='text-center mt-20 text-[30px]'/>}
              {
                  !loading && 
                  <div
                  className=' flex p-5 justify-around'
                  >
                      
                          <div
                          className=' flex flex-col gap-5 self-start p-8 min-w-[700px] min-h-[700px]  bg-violet-500/25 shadow-xl rounded-2xl'
                          >
                              <div
                                  className='text-[25px] text-center'
                              >
                                  órden de cuidado
                                  <div># {id} </div>
                              </div>
                              <div
                                className=''
                              >
                                  <div
                                  className='w-full h-[1px] bg-black'
                                  />
                                      
                                  <div
                                  className='text-[35px] font-semibold mb-5 '
                                  >
                                    mascotas
                                  </div>
                            {
                                      info?.pets?.map((p:any) =>
                                          <div
                                key={p._id}
                                className="flex gap-5 items-center"
                                >
                                                <Image
                                                src={p.images[0]}
                                                alt="profile-image"
                                                height={200}
                                                width={200}
                                                className="object-fit object-center rounded-lg h-[150px] w-[150px] object-cover"
                                    />
                                              <span
                                              className='text-[20px] italic '
                                              >
                                        {p.name}
                                    </span>
                                            
                                    </div>)
                            }
                              </div>
                              <div>
                                <div
                                  className='w-full h-[1px] bg-black'
                                  />
                                  <div
                                      className='text-[35px] font-semibold mb-2 flex flex-col'
                                  >
                                      fechas
                                  </div>
                                  <p
                                      className='my-2 text-[18px]'
                                  >inicio: <span
                                  className='text-[20px] font-bold'
                                  >{new Date(info?.dates[0]).toLocaleDateString()}</span></p>
                                  <p
                                      className=' text-[18px]'
                                  >fin: <span
                                  className='text-[20px] font-bold'
                                  >{new Date(info?.dates[1]).toLocaleDateString()}</span></p>
                              </div>
                              <div
                                  className='w-full h-[1px] bg-black'
                              />
                              <div>
                                  
                              <div
                                      className='text-[35px] font-semibold mb-2'
                                      >
                                      estado: <span className={`${parseCareOrderBtnClass(info?.status as CareOrderStatus)} w-fit p-2 rounded-lg `}>{parseCareOrderStatus(info?.status as CareOrderStatus)}</span>
                                  </div>

                            </div>
                              
                              
                  </div>
                          <div
                              className='w-[40%] h-[700px] bg-violet-500/25 rounded-xl shadow-2xl p-5  overflow-y-scroll '
                          >
                              <div
                              className='text-center text-[30px]'
                              >
                                  Contacto con cuidadores
                              </div>
                              <div
                              className='p-5'
                              >
                                  <button
                                          onClick={handleContactSitter}
                                          className='p-5 text-[20px] bg-green-700 rounded-xl font-semibold text-white hover:scale-105 active:scale-100 duration-200'
                                  >
                                      {contactedSitters.length === 0 ? "Contactar cuidador" : "Contactar otro cuidador"}
                                      
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
                                  
                              { loadingFetchSitters && <LoadingPulsePaw containerClasses='text-center mt-20'/>}
                                {!loadingFetchSitters && contactedSitters.length! > 0 && 
                                      contactedSitters.map((e: ISitter) =>
                                          <div
                                              key={e._id}
                                              className='flex justify-between p-10  w-[100%]   min-h-[200px]  bg-white/50 cursor-pointer hover:shadow-2xl duration-200'
                                          >
                                              
                                          
                                        <div
                                      
                                              className='flex'
                                              >
                                              <Image
                                                src={e.profileImg || "/sitter-landing.jpg"}
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
                                                  >{e.username}</div>
                                                  <div>${e.price || 5000} x día</div>
                                                  <div>{e.username}</div>
                                              </div>
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
                                                  >
                                                      <FontAwesomeIcon icon={faTrash} />
                                                  </button>
                                        </div>
                                    </div>
                                            )
                                   }
                                   </div>
                        </div>
              </div>
                      
            } 

              
          </main>
        <Footer/>
      </>

  )
}

export default CareOrderDashboardView


