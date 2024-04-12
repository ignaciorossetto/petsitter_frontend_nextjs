"use client"
import { ICareOrderModel } from '@/types/types'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface IMapSitterInfoProps {
    handleContactSitterBtn: ()=> void,
    setSitterInfo: (s:any)=> void,
    sitterInfo: any,
    loadingSitterContact: boolean,
    careOrder: ICareOrderModel
}

const MapSitterInfo = ({sitterInfo, loadingSitterContact, handleContactSitterBtn, setSitterInfo, careOrder}: IMapSitterInfoProps) => {
    const [moreView, setMoreView] = useState(false)
    return (
        <div
        className='flex z-20 flex-col gap-2 bg-violet-200 shadow-2xl p-5'
        >
            
    <div className='h-[30%]   flex justify-between '>
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
                                {careOrder.contactedSitters?.includes(sitterInfo._id) ? "ver chat" : "Contactar Cuidador!" }
        
        </div>
    }
          </div>
            </div>
            {moreView && <div className='h-[300px]'></div> }
            <div
                className='text-center '
            >
                <span
                    className='italic hover:scale-110 cursor-pointer duration-200 p-3 bg-violet-500/50 rounded-xl'
                    onClick={()=> setMoreView((prev)=> !prev)}
                >
                    {moreView ? 'less...' : 'more...' }
                </span>
          </div>
    </div>
  )
}

export default MapSitterInfo