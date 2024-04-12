"use client"
import CareOrderConfirmedOrder from '@/components/CareOrderConfirmedOrder'
import CareOrderContactBoard from '@/components/CareOrderContactBoard'
import Footer from '@/components/Footer'
import LoadingPulsePaw from '@/components/LoadingComponents/LoadingPulsePaw'
import NavBar from '@/components/NavBar'
import PetCard from '@/components/PetCard'
import { UserContext } from '@/hooks/auth/authContext'
import { CareOrderStatus, ICareOrderModel, PetType  } from '@/types/types'
import { deleteCareOrder, getPendingOngoingCareOrder, updateCareOrder } from '@/utils/axiosRequests'
import { parseCareOrderBtnClass, parseCareOrderStatus } from '@/utils/utilsFunctions'
import { faArrowLeftLong, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const CareOrderDashboardView = () => {
    const { id } = useParams()
    const [info, setInfo] = useState<ICareOrderModel | null>(null)
    const router = useRouter()
    const { setCareOrder, setUser} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchInfo = async () => {
        const jwt = localStorage.getItem("psf-jwt")

            let cancelToken = axios.CancelToken.source();
            const response: ICareOrderModel = await getPendingOngoingCareOrder(jwt, id as string, cancelToken)
            setInfo(response)
        }
        fetchInfo()
    }, [id])
    

    const handleDeleteCareOrder = async () => {
        setLoading(true)
        try {
            const jwt = localStorage.getItem("psf-jwt")
            const response = await deleteCareOrder(jwt, id as string, info?.ownerId as string)
            Swal.fire({
                title: "Órden de cuidado borrada exitosamente!",
                toast: true,
                position: "top-right",
                timer: 2000,
                showConfirmButton: false,
                icon: "success"
            })
            setUser(response)
            router.push('/user/pets')
        } catch (error) {
            setLoading(false)
            Swal.fire({
                title: "Error al borrar órden de cuidado!",
                toast: true,
                position: "top-right",
                timer: 2000,
                showConfirmButton: false,
                icon: "error"
            })
        } finally {
            setLoading(false)
        }
    }

    

  return (
      <>
          <NavBar />
          <main
          className='min-h-[500px]'
          >
              { loading && <LoadingPulsePaw containerClasses='text-center mt-20 text-[30px]'/>}
              {
                  !loading && 
                  <>
                      <div
                                  className='relative text-[25px] text-center flex gap-2 items-center justify-center my-5'
                      >
                              <button
                              className='absolute left-20 hover:scale-105 active:scale-100 duration-200'
                              onClick={()=> router.push('/user/pets')}
                              >
                                  <FontAwesomeIcon icon={faArrowLeftLong} size='xl'/>
                              </button>
                          <div
                                  className='flex gap-10 justify-center items-baseline '
                          >
                              <div
                                  className='text-[40px]'
                              >
                                    #  cuidado
                                        
                                    </div>
                                    <div>{id} </div>
                                      
                            </div>
                                 
                                  <button
                                      onClick={handleDeleteCareOrder}
                                      className='self-center mr-5 bg-white/75 p-3 px-5 rounded-lg text-[35px] text-red-500 hover:scale-110 active:scale-100 duration-200 cursor-pointer'
                                  >
                                      <FontAwesomeIcon icon={faTrash}/>
                                  </button>
                      </div>
                      
                       
                  <div
                  className=' flex p-5 justify-around'
                  >
                      
                          <div
                          className=' flex flex-col gap-5 self-start min-w-[700px] min-h-[700px]'
                          >
                              
                              <div
                                  className='p-10 shadow-2xl shadow-black/40 rounded-xl flex flex-col gap-10'
                              >
                                  
                                  <div
                                  className='text-[35px] font-semibold self-center'
                                  >
                                    mascotas
                                  </div>
                              <div
                                className='grid grid-cols-2 gap-3'
                              >
                                      
                                  {
                                      info?.pets?.map((p: string | PetType) => {
                                          if (typeof p === 'string') {
                                              return null; // Or handle the string case appropriately
                                            } else {
                                                return (
                                                    <div key={p._id} className="flex gap-5 items-center relative">
                                                        <Image
                                                            src={p.images[0] || ""}
                                                            alt="profile-image"
                                                        height={200}
                                                        width={200}
                                                        className="object-fit object-center rounded-lg h-[200px] w-[200px] object-cover"
                                                        loading='lazy'
                                                    />
                                                    <span className={`text-[20px] ${p.sex === 'male' ? "bg-blue-100 " : "bg-pink-100 "} font-semibold  italic absolute  p-3 rounded-md rounded-bl-none rounded-tl-md top-0 left-0`}>{p.name}</span>
                                                </div>
                                            );
                                        }
                                    })
                                }
                              </div>
                            </div>
                              {/* <div
                                className='w-full h-[1px] bg-black'
                                /> */}
                              <div
                                  className=' flex justify-between h-[320px] mt-10'
                              >
                                  <div
                                  className='p-10 w-[45%] shadow-2xl shadow-black/40 rounded-xl '
                                  >
                                      
                                  <div
                                      className='text-[35px] font-semibold mb-2 flex flex-col'
                                      >
                                      fechas
                                  </div>
                                  <p
                                      className='my-2 text-[18px]'
                                      >inicio: <p
                                      className='text-[20px] font-bold'
                                      >{new Date(info?.dates[0]).toLocaleDateString()}</p></p>
                                  <p
                                      className=' text-[18px]'
                                      >fin: <p
                                      className='text-[20px] font-bold'
                                          >{new Date(info?.dates[1]).toLocaleDateString()}</p></p>
                                      <button
                                      className='mt-3 text-[19px] p-2 bg-blue-400 text-white font-semibold rounded-xl hover:scale-105 active:scale-100 duration-200'
                                      >
                                          Modificar fechas
                                      </button>
                              </div>
                              <div
                                      className='text-[35px] w-[50%] flex flex-col gap-5 font-semibold p-10 shadow-2xl shadow-black/40 rounded-xl '
                                  >
                                      <p>estado</p>
                                      <div
                                      className={`${parseCareOrderBtnClass(info?.status as CareOrderStatus)} text-[30px] p-3 `}
                                      >
                                      <span className={` w-fit p-2 rounded-lg mt-10`}>{parseCareOrderStatus(info?.status as CareOrderStatus)} </span>
                                      {CareOrderStatus.CONFIRMED && <span>&#129395;</span> }
                                          
                                      </div>
                                  </div>
                              </div>
                              {/* <div
                                  className='w-full h-[1px] bg-black'
                              /> */}
                              <div>
                                  

                            </div>
                              
                              
                          </div>
                          {
                            !info?.confirmed && 
                            <CareOrderContactBoard id={id} setInfo={setInfo} info={info} setCareOrder={setCareOrder} />  
                          }
                          {
                            info?.confirmed && 
                            <CareOrderConfirmedOrder id={id} setInfo={setInfo} info={info} setCareOrder={setCareOrder} />  
                          }
              </div>
              </>
                      
            } 

              
          </main>
        <Footer/>
      </>

  )
}

export default CareOrderDashboardView


