"use client"
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { UserContext } from '@/hooks/auth/authContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SitterContext } from '@/hooks/auth/sitterContext'

function haversine_distance(mk1:any, mk2:any) {
    var R = 6371.0710; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }

const GetSitterView = () => {
    const [isSiblingComponentActive, setSiblingComponentActive] = useState(false);
    const [sitterInfo, setSitterInfo] = useState<any>(null)
    const [setSitterInfoBool, setsetSitterInfoBool] = useState(false)
    const [clickedMarkerID, setClickedMarkerID] = useState(null)
    const {user, setUser} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [loadingSitterContact, setLoadingSitterContact] = useState(false)
    const [sitters, setSitters] = useState<any>([])
    const [userMarker, setUserMarker] = useState<any>()
    const router = useRouter()
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
        libraries: ['places'],
    })

    const handleContactSitterBtn = async() => {
        setLoadingSitterContact(true)
        const obj = {
            receiverId: sitterInfo._id,
            senderId: user._id
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conversations`, obj, {withCredentials:true})
            const sitterID = response.data.members.filter((e:any)=> e !== user._id)
            router.push(`/user/chat?cid=${response.data._id}&sid=${sitterID[0]}`)
            setLoadingSitterContact(false)
        } catch (error) {
            console.log(error)
            router.push(`/error?code=1`)
            setLoadingSitterContact(false)
        }
    }

    const handleMarkerClick = (eid:any) => {
        setClickedMarkerID(eid)
        setSiblingComponentActive(true);
      };
      
    const center = useMemo(()=> ({
        lat: user?.fullAddress?.latLng.lat,
        lng: user?.fullAddress?.latLng.lng
    }), [])

    const getSitters = async() => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sitters/getSittersNearby?radius=3000&lat=${center.lat}&lng=${center.lng}`)
        let _sitters = [] 
        for (let i = 0; i < response?.data?.payload?.length; i++) {
            const element = response?.data?.payload[i];
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
    }, [])

    const handleSitterCard = (sitter:any) => {
        setSitterInfo(sitter)
    }

    useEffect(()=> {
    }, [sitterInfo])

  return (
    <>
    <NavBar/>
    <section id='bb'>
        {!isLoaded && <FontAwesomeIcon icon={faSpinner} size='2xl' spin className='flex justify-center mt-20 h-16 w-full' />}
        {isLoaded && 
        <div className='h-full w-full flex flex-col-reverse sm:flex-row'>
            <div className='h-[400px] sm:h-[80vh] sm:w-[30%] bg-violet-200 overflow-scroll overflow-x-hidden mt-3 sm:mt-0 shadow-2xl'>
                <h1 className='text-center font-medium text-2xl p-3'>Sitters cerca</h1>
                {sitters.map((e:any)=> 
                    <div id={`aa-${e?._id}`}  onClick={()=>{
                    handleSitterCard(e)
                    handleMarkerClick(e?._id)}
                    } key={e?._id} className={`${(e?._id ===  clickedMarkerID) && 'bg-violet-800 text-white'} cursor-pointer hover:scale-105 duration-200 p-2 px-4 flex justify-between bg-violet-400 rounded-2xl m-3 :bg-violet-800`}>
                        <div className=''>
                            <div className='text-lg font-medium' >
                                {e?.username}
                            </div>
                            <div>
                                Distancia: {e?.distance_to_center} km
                            </div>
                            <div className='flex gap-3 items-end my-2'>
                                <div className={` bg-orange-800 p-1  rounded-md text-white w-fit font-medium`}>
                                    4.7
                                </div>
                                <div className=''> Excelente! </div>
                            </div>
                        </div>
                        <div className='self-center font-semibold'>
                            $1500 p/ día
                        </div>
                    </div>
                )}
            </div>

            <div className='w-full h-[600px] sm:h-auto sm:w-[70%] '>
                <GoogleMap 
                zoom={13}
                center={center}
                mapContainerClassName={`w-full ${sitterInfo ? 'h-[70%]' : 'h-[100%]'}`}
                >
                    {sitters.map((element:any)=> {
                        
                   return <MarkerF 
                   key={element?._id} position={{
                       lat: element?.location?.coordinates[1],
                       lng: element?.location?.coordinates[0]
                    }}
                    icon={{
                        url: "/home.png",
                    }}
                    onClick={()=>{
                        handleMarkerClick(element?._id)
                        handleSitterCard(element)
                    }}
                    />
                })}
               
             <MarkerF position={center} icon={{
                            url: "/pawprint.png",
                            
                        }}/>

                
                </GoogleMap>
                {sitterInfo && <div className='h-[30%] bg-violet-200  shadow-2xl flex justify-between p-5'>
                    <div className='flex flex-col gap-3'>
                        <div className='font-semibold text-2xl'>{sitterInfo?.username}</div>
                        <div>Tipo propiedad: Casa</div>
                        <div>{sitterInfo?.desc}</div>
                        <div>$1500 p/ día</div>
                        
                    </div>
                    <div className='flex flex-col justify-between'>
                    <div className='self-end h-fit font-bold text-xl hover:scale-125 duration-200 cursor-pointer' onClick={()=> setSitterInfo(null)}>X</div>
                    
                    {
                        loadingSitterContact ?
                        <div className=' w-[250px] h-[70px] text-center text-xl font-semibold p-4 rounded-2xl duration-200 bg-violet-800 text-white ease-in-out'>
                        <FontAwesomeIcon icon={faSpinner} spin className='h-10 w-10' />
                            </div>
                        :
                        <div onClick={handleContactSitterBtn} className=' bg-violet-400 w-[250px] h-[70px] flex items-center justify-center text-xl font-semibold p-4 rounded-2xl hover:scale-110 duration-200 cursor-pointer hover:bg-violet-800 hover:text-white ease-in-out'>
                        Contactar Sitter!
                            </div>
                    }
                    </div>
                    </div>}
            </div>
        </div>
        }
    </section>
    <Footer/>


    </>
  )
}

export default GetSitterView