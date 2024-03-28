import { CardProps } from '@/types/types'
import Image from 'next/image'
import React from 'react'

const PetCard = ({petInfo, handleDeletePetBtn}:CardProps) => {
    


  return (
    <div
      key={petInfo?._id}
      className={`
        ${petInfo?.sex === 'male' ? 'bg-blue-100' : 'bg-pink-100'} 
          w-[300px] xxs:w-[350px] shadow-2xl p-5 flex flex-col gap-5 items-center`}>
        <div className='h-[230px] xxs:h-[300px] w-[230px] xxs:w-[300px] relative'>
          <Image
          src={petInfo?.images[0]}
          alt='pet-image'
          fill={true}
            className='min-w-[230px] xxs:min-w-[300px] min-h-[230px] xxs:min-h-[300px] max-w-[230px] xxs:max-w-[300px] max-h-[230px] xxs:max-h-[300px] object-cover hover:scale-[117%] hover:rounded-none active:scale-105 active:rounded-2xl duration-200 cursor-pointer rounded-2xl' />
            <div className='absolute top-[-15px] right-[-5px] bg-white p-3 rounded-xl font-semibold shadow-xl '>{petInfo.name}</div>
        </div>
    </div>
  )
}

export default PetCard