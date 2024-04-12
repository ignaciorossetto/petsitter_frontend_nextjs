"use client"
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React, { MouseEventHandler, Suspense, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTruckMedical } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '@/hooks/auth/authContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { createOrGetConversation, getSittersNearBy, updateCareOrder } from '@/utils/axiosRequests'
import { GeoLocSittersInfoType } from '@/types/types'
import MapSitterCard from '@/components/MapSitterCard'
import MapSitterInfo from '@/components/MapSitterInfo'
import axios from 'axios'
import Swal from 'sweetalert2'
import { haversine_distance } from '@/utils/utilsFunctions'
import LoadingPulsePaw from '@/components/LoadingComponents/LoadingPulsePaw'

const libraries =[ 'places']



const GetSitterView = () => {
    const [isSiblingComponentActive, setSiblingComponentActive] = useState(false);
    const [sitterInfo, setSitterInfo] = useState<any>(null)
    const [setSitterInfoBool, setsetSitterInfoBool] = useState(false)
    const [clickedMarkerID, setClickedMarkerID] = useState(null)
    const {user, careOrder} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [loadingSitterContact, setLoadingSitterContact] = useState(false)
    const [sitters, setSitters] = useState<any>([])
    const [userMarker, setUserMarker] = useState<any>()
    const [zoom, setZoom] = useState<number>(13)
    const [selectedMarkerID, setSelectedMarkerID] = useState(null);
    const router = useRouter()

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
        libraries: libraries as ("places" | "drawing" | "geometry" | "localContext" | "visualization")[],
    })
    const [radius, setRadius] = useState(3000)
    const sitterContainerRef = useRef<HTMLDivElement>(null)
    const clickedMarkerRef = useRef<google.maps.Marker | null>(null)

    const searchParams = useSearchParams();
    const orderId = searchParams.get('careOrder') || careOrder._id || null
    const handleContactSitterBtn = async () => {
        setLoadingSitterContact(true)
        if (careOrder.contactedSitters?.includes(sitterInfo._id)) {
            router.push(`/user/care-order/${careOrder._id}?openChat=${sitterInfo._id}`)
            setLoadingSitterContact(false)
            return
        }
        const obj = {
            $push: {
                contactedSitters: sitterInfo._id
            }
        }
        try {
            const jwt = localStorage.getItem('psf-jwt')
            if (orderId) {
                await updateCareOrder(jwt, orderId, obj)
            }
            router.push(`/user/care-order/${careOrder._id}?openChat=${sitterInfo._id}`)
            setLoadingSitterContact(false)
        } catch (error) {
            console.log(error)
            router.push(`/error?code=1`)
            setLoadingSitterContact(false)
        }
    }

    const handleBoton = () => {
        console.log(careOrder)
    }

    const handleMarkerClick = (sitter:any) => {
        setCenter({lat: sitter.location?.coordinates[1], lng: sitter.location?.coordinates[0]})
        setClickedMarkerID(sitter._id)
        setSiblingComponentActive(true);
        setZoom(15)
        setSelectedMarkerID(sitter._id);
        if (clickedMarkerRef.current) {
            const clickedMarker = clickedMarkerRef.current;
            clickedMarker.setAnimation(window.google.maps.Animation.BOUNCE);
            // Stop animation after 3 seconds
            setTimeout(() => clickedMarker.setAnimation(null), 3000);
        }
        if (sitterContainerRef.current) {
            const container = sitterContainerRef.current;
            const sitterCard = container.querySelector(`#aa-${sitter._id}`);

            if (sitterCard) {
                const containerRect = container.getBoundingClientRect();
                const sitterCardRect = sitterCard.getBoundingClientRect();

                const topPos = sitterCardRect.top - containerRect.top + container.scrollTop;
                const containerHeight = container.clientHeight;

                container.scrollTop = topPos - (containerHeight / 2) + (sitterCard.clientHeight / 2);
            }
        }
    };

    
    
      
    const centerInfo = useMemo(()=> ({
        lat: user?.fullAddress?.latLng.lat as number,
        lng: user?.fullAddress?.latLng.lng as number
    }), [])

    const [center, setCenter] = useState(centerInfo)

    const getSitters = async() => {
        const obj:GeoLocSittersInfoType = {
            lat: center.lat as number,
            lng: center.lng as number,
            radius: radius || 3000 
        }
        const jwt = localStorage.getItem('psf-jwt')
        const data = await getSittersNearBy(jwt, obj, careOrder)
        if (!data) {
            Swal.fire({
                title: "Error al cargar cuidadores!",
                toast: true,
                position: "top-right",
                timer: 2000,
                showConfirmButton: false,
                icon: "error"
            })
        }
        let _sitters = [] 
        for (let i = 0; i < data?.payload?.length; i++) {
            const element = data?.payload[i];
            const distance = haversine_distance(center, {lat: element?.location?.coordinates[1], lng: element?.location?.coordinates[0]},)
            element.distance_to_center = distance.toFixed()
            _sitters.push(element)
        }
        _sitters.sort((a, b) => {
            return a?.distance_to_center - b?.distance_to_center;
        });
        setSitters(_sitters)
        setLoading(false)
    }

    useEffect(()=> {
        if(!user){
            router.push('/error?code=1')
        }
    }, [])

    useEffect(()=> {
        setLoading(true)
        getSitters()
        setUserMarker(center)
    }, [radius])

    const handleSitterCard = (sitter: any) => {
        setSitterInfo(sitter)
        
    }

    return (
      <Suspense>
    <div>
          <NavBar />
          {/* <button
          onClick={handleBoton}
          >boton</button> */}
    <section>
        {!isLoaded && <LoadingPulsePaw containerClasses='text-center text-[25px] min-h-[500px] pt-20'/>}
        {isLoaded && 
        <div className='h-full w-full flex flex-col-reverse sm:flex-row'>
                      <div
                          ref={sitterContainerRef}
                          className='relative h-[400px] sm:h-[80vh] sm:w-[30%] bg-violet-200 mt-3 sm:mt-0 shadow-2xl overflow-y-scroll'>
                <div className='bg-violet-200 z-[5] flex flex-col md:flex-row gap-2 md:gap-5 justify-center items-center h-[130px] md:h-[100px] p-2 sticky top-0'>
                <h1 className='text-center font-medium text-2xl p-3'>Cuidadores cerca</h1>
 
                <select 
                className='text-sm lg:text-lg p-1 lg:p-3 align-bottom h-fit rounded-lg font-semibold '
                onChange={(e)=> setRadius(parseInt(e.target.value))} name="radius" id="">
                    <option value={1000}>1km</option>
                    <option value={2000}>2km</option>
                    <option selected value={3000}>3km</option>
                    <option value={4000}>4km</option>
                    <option value={5000}>5km</option>
                    <option value={10000}>10km</option>
                    <option value={20000}>20km</option>
                </select>
                          </div>
                              
                {sitters.map((e:any)=> 
                    <MapSitterCard
                        key={e._id}
                        clickedMarkerID={clickedMarkerID}
                        handleMarkerClick={handleMarkerClick}
                        handleSitterCard={handleSitterCard}
                        sitter={e}
                    />
                )}
                          
            </div>

            <div className='relative w-full h-[600px] sm:h-auto sm:w-[70%] '>
                <GoogleMap 
                zoom={zoom}
                center={center}
                mapContainerClassName={`w-full ${sitterInfo ? 'h-[70%]' : 'h-[100%]'}`}
                              options={{
                                  streetView: null,
                                  fullscreenControl: null,
                                  mapTypeControl: false,
                                  streetViewControl: true,
                                  
                }}      
                >
                    {sitters.map((element:any)=> {
                        
                   return <MarkerF 
                   
                   key={element?._id} position={{
                       lat: element?.location?.coordinates[1],
                       lng: element?.location?.coordinates[0]
                    }}

                       icon={{
                        url:"/home.png" 
                    }}
                        animation={element?._id === clickedMarkerID ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
                       onClick={() => {
                            handleMarkerClick(element)
                           handleSitterCard(element)
                       }}
                       
                    />
                })}
               
                              <MarkerF
                                  onClick={()=> setCenter(centerInfo)}
                                  position={centerInfo}
                                  icon={{
                                    url: "/pawprint.png",
                            
                        }}/>

                
                </GoogleMap>
                          {sitterInfo && <MapSitterInfo
                            handleContactSitterBtn={handleContactSitterBtn}
                              loadingSitterContact={loadingSitterContact}
                              setSitterInfo={setSitterInfo}
                              sitterInfo={sitterInfo}
                              careOrder={careOrder}
                          />
                          }
            </div>
        </div>
        }
    </section>
    <Footer/>


            </div>
            </Suspense>
  )
}

export default GetSitterView