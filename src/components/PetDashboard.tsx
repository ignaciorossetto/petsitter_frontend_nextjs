import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext, UserContextType } from '@/hooks/auth/authContext'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faShop, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Swal from 'sweetalert2'
import PetCard from './PetCard'
import { CareOrderStatus, ICareOrderModel, PetType } from '@/types/types'
import useAuthRequest from '@/hooks/auth/useAuthRequest'
import { parseCareOrderBtnClass, parseCareOrderStatus } from '@/utils/utilsFunctions'

const PetDashboard = () => {
    const {user, setUser} = useContext<UserContextType>(UserContext) 
    const { verifyToken } = useAuthRequest()
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
    const handleGetSitterBtn = () => {
        if(!user?.fullAddress?.address) {
            return Swal.fire({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "warning",
                title: `Debes agregar tu dirección en panel de usuario primero!`,
              });
              
        }
        router.push('/user/set-sitting')
    }

    const display = async():Promise<void> => {
        const response = await verifyToken()     
        if (response) {
            setLoading(false)
            return
        } else {
          router.push('/error?code=1')
        }
    }
  useEffect(() => {
        display()
  }, [])
  
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
    }, [user])

  const handleDeletePetBtn = async (petId: string) => {
      const token = localStorage.getItem('psf-jwt')
      
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
              try {
                Swal.fire("Mascota eliminada", "Mascota eliminada con éxito.", "success");
                  setLoading(true)
                const response = await axios.delete(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pets/${petId}`, {
                    headers: {
                          Authorization: `Bearer ${token}`
                        }
                    }
                  );
                setLoading(false)
              setUser(response.data.payload)
              } catch (error) {
                Swal.fire("Mascota eliminada", "No se elimino mascota.", "error");
                setLoading(false)
              }
            }
          });
    }


  return (
    <>
    {
        user &&
    
    <div className='min-h-[60vh] flex flex-col w-full '>
        {loading && <FontAwesomeIcon size="2xl"  className='p-16 self-center' icon={faSpinner} spin/> }
        {!loading && 
            <div className='hidden sm:flex  justify-center sm:justify-normal gap-5 p-3 mb-7'>
                <Link href={'/user/pets/add'}>
                  <div className='font-medium text-lg hover:scale-105 duration-200 cursor-pointer'><FontAwesomeIcon className='h-6 w-6' icon={faPlus}/> mascota</div>
                </Link>
                <Link href={'#'}>
                  <div className='font-medium text-lg hover:scale-105 duration-200 cursor-pointer'><FontAwesomeIcon className='h-6 w-6' icon={faShop} /> tienda</div>
                </Link>
            {
            user?.pets?.length! > 0 &&
            <div
              onClick={handleGetSitterBtn}
              className="font-semibold text-lg text-white hover:scale-105 p-2 -mt-1 cursor-pointer text-center rounded-xl duration-150 bg-violet-500 hover:bg-slate-500">
                    Buscar cuidador!
                  </div>
          }
          {
            user?.careOrders?.length! > 0 && 
            user?.careOrders?.map((e:ICareOrderModel) => {
              if (e.status === CareOrderStatus.NOT_CONFIRMED || e.status === CareOrderStatus.CONFIRMED || e.status === CareOrderStatus.ON_GOING) {
                return <div
                  key={e._id}
                onClick={()=>router.push(`/user/care-order/${e._id}`)}
                className={`font-semibold text-lg text-white hover:scale-105 p-2 -mt-1 cursor-pointer text-center rounded-xl duration-150 ${parseCareOrderBtnClass(e?.status as CareOrderStatus)} hover:bg-slate-500 animate-pulse`}>
                      Orden: {parseCareOrderStatus(e.status)}
                </div>
              }
            })
          }
              </div>
            }
            <div className='flex gap-10 flex-wrap justify-center'>

        {!loading &&
          <>
        {
          
          user?.pets?.map((petInfo: any) => (
            <PetCard key={petInfo?._id} handleDeletePetBtn={handleDeletePetBtn} petInfo={petInfo}/>)
        )
      }
      </>
    }
            {user?.pets?.length === 0 && 
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
      }
      </>
  )
}

export default PetDashboard