import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '@/hooks/auth/authContext'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faShop, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Swal from 'sweetalert2'
import PetCard from './PetCard'

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
        {loading && <FontAwesomeIcon size="2xl"  className='p-16 self-center' icon={faSpinner} spin/> }
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
            <PetCard key={e._id} handleDeletePetBtn={handleDeletePetBtn} e={e}/>
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