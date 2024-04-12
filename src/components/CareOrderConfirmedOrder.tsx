"use client"
import { CareOrderStatus, ICareOrderModel, ISitter, PaymentStatus } from '@/types/types'
import { getContactedSitters, getSitterInfoForConfirmedOrder, updateCareOrder } from '@/utils/axiosRequests'
import { useRouter } from 'next/navigation'
import React, { Dispatch, useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import LoadingPulsePaw from './LoadingComponents/LoadingPulsePaw'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faInfo, faPaw, faTrash } from '@fortawesome/free-solid-svg-icons'
import { createGoogleMapsUrl, haversine_distance } from '@/utils/utilsFunctions'
import { UserContext } from '@/hooks/auth/authContext'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { Span } from 'next/dist/trace'
import Link from 'next/link'


const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ['places'];


const CareOrderConfirmedOrder = ({
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
    const [sitter, setSitter] = useState<ISitter | null>(null)
    const { user, setUser } = useContext(UserContext)
    const {isLoaded, loadError, url} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
        libraries: libraries ,
    })


    useEffect(() => {
        const fetchSitterInfo = async () => {
            setLoading(true)
            try {
                const jwt = localStorage.getItem("psf-jwt")
                const data = await getSitterInfoForConfirmedOrder(jwt, info?._id as string, info?.sitter as string)
                setSitter(data)
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
        if (info?.sitter) {
            fetchSitterInfo()
        }
    }, [info?._id, info?.sitter])

    

    return (
        <>
      
    <div
                              className='w-[40%] h-auto bg-white rounded-xl shadow-2xl shadow-black/40 p-5  overflow-y-auto '
                          >
                              <div
                              className='text-center mb-5 text-[35px] font-semibold'
                              >
              cuidador
              
          </div>

          { loading && <LoadingPulsePaw containerClasses='text-center mt-20'/>}

          {
             !loading && sitter && 
                    <div
                        className='flex justify-between'
                    >
                  
                                    <div
                                              className='flex gap-3 flex-col mt-5'
                                              >
                                              <Image
                                                src={sitter?.profileImg || "/sitter-landing.jpg"}
                                                alt="profile-image"
                                                height={150}
                                                width={150}
                                                className="object-fit object-center rounded-lg h-[250px] w-[250px] object-cover"
                                                />
                                              <div
                                              className='px-3 flex flex-col gap-3'
                                              >
                                                  <div
                                                      className='text-[20px] font-semibold'
                                    >{sitter?.username}</div>
                                    <div
                                    className='flex justify-start gap-5 '
                                    >
                                        <button
                                        className='flex items-baseline gap-2 bg-gray-200 hover:scale-105 active:scale-100 duration-200 p-3 rounded-xl text-[20px]'
                                        ><FontAwesomeIcon icon={faCommentDots}/> <span> chat</span></button>
                                        <button
                                        className='flex items-baseline gap-2 bg-gray-200 hover:scale-105 active:scale-100 duration-200 p-3 rounded-xl text-[20px]'
                                        ><FontAwesomeIcon icon={faInfo}/> <span> info</span></button>
                                    </div>
                                              </div>
                      </div>
                      {
          isLoaded ? 
                 
                                    <div
                                        className='flex flex-col justify-center gap-5 items-center w-[250px]'
                                    >
                                        
          <div
          className='rounded-full border-violet-400 border-4  w-[250px] h-[250px] relative'
                                        >
                                            <div
                                            className='rounded-full  absolute -top-1 -left-1  bg-transparent shadow-violet-400 shadow-2xl animate-pulse w-[250px] h-[250px]'
                                            />
        
        <GoogleMap
            mapContainerClassName='w-full h-full rounded-full'
            zoom={16}
                                            center={{ lat: sitter?.location?.coordinates[1], lng: sitter?.location?.coordinates[0] }}
                                            options={{
                                                streetView: null,
                                                fullscreenControl: null,
                                                mapTypeControl: false,
                                                streetViewControl: false,
                                                scaleControlOptions: null,
                                                disableDoubleClickZoom: false,
                                                zoomControl: false,
                                                gestureHandling: "none",
                                                clickableIcons: false


                                                
                              }}     
            >
            <MarkerF
                position={{lat: sitter?.location?.coordinates[1], lng: sitter?.location?.coordinates[0]}}
                icon={{
                    url: "/home.png",
                    
                }}/>
            </GoogleMap>
            
                                        </div>
                                        <div
                                                          className='italic text-[15px] self-center '
                                                          >{haversine_distance(user?.fullAddress?.latLng, { lat: sitter?.location?.coordinates[1], lng: sitter?.location?.coordinates[0] }).toFixed()} km de distancia</div>
                                        <div
                                        className='w-full flex flex-col justify-center hover:scale-105  active:scale-105 duration-200'
                                        >
                                        <Link
                                                href={`${createGoogleMapsUrl(sitter?.location?.coordinates[1], sitter?.location?.coordinates[0])}
                                            `}
                                            target='_blank'
                                            className='p-3 text-[18px] font-semibold bg-violet-400 self-center '
                                        >
                                            Ver dirección
                                    </Link>

                                        </div>
          </div>


            :
            <LoadingPulsePaw containerClasses='text-center mt-20'/>
        }
                  </div>
                                
          }
          { loadError && <div>Error al cargar mapa</div>}
                              
                                  {/* <div
                                  className='w-full h-[1px] bg-black'
                              /> */}

        </div>
      <>
      
        </>
      </>
  )
}

export default CareOrderConfirmedOrder