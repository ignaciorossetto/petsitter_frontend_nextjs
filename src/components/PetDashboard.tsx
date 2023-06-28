import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '@/hooks/auth/authContext'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faShieldDog, faShop, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { faCalendar, faCalendarAlt, faCalendarPlus, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import Swal from 'sweetalert2'

// const pets = [
//     {
//     name: 'Tomi',
//     images: ['https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg'],
//     sex: 'male'
// },
//     {
//     name: 'María',
//     images: ['/maria.jpg'],
//     sex: 'female'
// },

// ]

const PetDashboard = () => {
    const {user, setUser, verifyAuth} = useContext(UserContext) 
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const display = async() => {
        const response = await verifyAuth()     
        if (response) {
            setLoading(false)
        }
    }
    useEffect(()=> {
        display()
    }, [])

    const handleDeletePetBtn = async(petId:string) => {
        Swal.fire({
            title: "Quieres borrar la mascota?",
            text: "No se puede revertir este cambio!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dd3333bb",
            cancelButtonColor: "#71db64c2",
            confirmButtonText: "Si, borrar mascota!",
            cancelButtonText: "No borrar mascota!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              Swal.fire("Mascota eliminada", "Mascota eliminada con éxito.", "success");
                setLoading(true)
              try {
                const response = await axios.delete(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pets/${user._id}/${petId}`, {
                        withCredentials:true
                    }
                  );
                setLoading(false)
              setUser(response.data.payload)
              } catch (error) {
                console.log(error)
                setLoading(false)
                router.push('/error?code=3')
              }
            }
          });
    }


  return (
    <div className='min-h-[60vh] flex flex-col w-full '>
        {loading && <FontAwesomeIcon className='p-16 h-16 w-16  self-center' icon={faSpinner} spin/> }
        {!loading && 
            <div className='flex justify-center sm:justify-normal gap-5 p-3 mb-7'>
                <Link href={'/user/pets/add'}>
                <div className='font-medium text-lg hover:scale-105 duration-200 cursor-pointer'><FontAwesomeIcon className='h-6 w-6' icon={faPlus}/> mascota</div>
                </Link>
                <Link href={'#'}>
                <div className='font-medium text-lg hover:scale-105 duration-200 cursor-pointer'><FontAwesomeIcon className='h-6 w-6' icon={faShop} /> tienda</div>
                </Link>
            </div>
            }
            <div className='flex gap-10 flex-wrap justify-center'>

        {!loading && user?.pets.map((e:any)=>
            <div key={e?._id} className={`bg-${e?.sex === 'male' ? 'blue' : 'pink'}-100 shadow-2xl p-5 flex flex-col gap-5`}>
                <div className='relative h-[50%] flex-1'>
                <Image src={e?.images[0]} alt='' width={300} height={300}  className='min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] object-cover hover:scale-110 duration-200 cursor-pointer rounded-2xl'/>
                <div className='absolute top-[-15px] right-[-5px] bg-white p-3 rounded-xl font-semibold shadow-xl '>{e.name}</div>
                </div>
                <div className='flex gap-5 justify-center'>
                    <Link href={'#'}>
                    <FontAwesomeIcon className='h-8 w-8 cursor-pointer hover:scale-105 duration-200' icon={faCalendarPlus}/>
                    </Link>
                    <Link href={'#'}>
                    <FontAwesomeIcon className='h-8 w-8 cursor-pointer hover:scale-105 duration-200' icon={faShieldDog}/>
                    </Link>
                    <div onClick={()=> handleDeletePetBtn(e._id)}>
                    <FontAwesomeIcon className='h-8 w-8 cursor-pointer hover:scale-105 duration-200 text-red-500' icon={faTrashCan}/>
                    </div>
                </div>
            </div>
            )
        }
            {user?.pets.length === 0 && 
                <div>
                    <h2 className='p-2 text-center text-2xl sm:text-3xl font-semibold'>
                        No tienes ninguna mascota! 
                    </h2>
                    <br />
                    <Link href={'/user/pets/add'}>
                    <div className='text-center font-semibold text-xl py-5 sm:p-5 bg-violet-300 text-black rounded-2xl hover:scale-105  sm:hover:scale-110 hover:bg-violet-500 ease-in-out hover:text-white duration-200 cursor-pointer '>
                        Agregar mascota!
                    </div>
                    </Link>

                </div> 
            }
        </div>
    </div>
  )
}

export default PetDashboard