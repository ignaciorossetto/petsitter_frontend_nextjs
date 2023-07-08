import { UserContext } from '@/hooks/auth/authContext'
import { faCalendarPlus, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faShieldDog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import Swal from 'sweetalert2'

const PetCard = ({e, handleDeletePetBtn}:any) => {
    console.log(e)
    const {user} = useContext(UserContext)
    const router = useRouter()
    const handleGetSitterBtn = () => {
        if(user.fullAddress.address === undefined) {
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
        router.push('/user/get-sitter')
    }


  return (
    <div key={e?._id} className={`bg-${e?.sex === 'male' ? 'blue' : 'pink'}-100 shadow-2xl p-5 flex flex-col gap-5`}>
                <div className='relative h-[50%] flex-1'>
                <Image src={e?.images[0]} alt='' width={300} height={300}  className='min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] object-cover hover:scale-110 duration-200 cursor-pointer rounded-2xl'/>
                <div className='absolute top-[-15px] right-[-5px] bg-white p-3 rounded-xl font-semibold shadow-xl '>{e.name}</div>
                </div>
                <div className='flex gap-5 justify-center'>
                    <button onClick={handleGetSitterBtn}>
                    <FontAwesomeIcon size="xl"  className='cursor-pointer hover:scale-105 duration-200' icon={faCalendarPlus}/>
                    </button>
                    <Link href={'#'}>
                    <FontAwesomeIcon size="xl"  className='cursor-pointer hover:scale-105 duration-200' icon={faShieldDog}/>
                    </Link>
                    <div onClick={()=> handleDeletePetBtn(e._id)}>
                    <FontAwesomeIcon size="xl"  className='cursor-pointer hover:scale-105 duration-200 text-red-500' icon={faTrashCan}/>
                    </div>
                </div>
            </div>
  )
}

export default PetCard