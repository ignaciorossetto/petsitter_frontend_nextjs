import React from 'react'

interface IMapSitterCardProps {
    handleSitterCard: (s:any)=> void,
    handleMarkerClick: (s:any)=> void,
    sitter: any,
    clickedMarkerID: string | null,
}

const handleBgRateColor = (rate:number) => {
    if (rate === 5) {
        return 'bg-green-700 text-white font-bold text-[20px] animate-bounce'
    }
    if (rate >= 4 && rate < 5) {
        return 'bg-green-300'
    }
    if (rate >= 3 && rate < 4) {
        return 'bg-yellow-400'
    }
    if (rate >= 0 && rate < 3) {
        return 'bg-red-300'
    }
}

const parseSitterRateText = (rate:number) => {
    if (rate === 5) {
        return 'Excelente!'
    }
    if (rate >= 4 && rate < 5) {
        return 'Muy bueno'
    }
    if (rate >= 3 && rate < 4) {
        return 'Bueno'
    }
    if (rate >= 0 && rate < 3) {
        return 'Regular'
    }
}

const rateArr = [1.2, 2, 2.5, 4.5, 4.8, 5, 5, 3.4, 3.8, 4.2, 4.7, 4.9, 4.8, 3, 4, 5, 4.1, 3.5]

const MapSitterCard = ({
    handleSitterCard,
    handleMarkerClick,
    sitter,
    clickedMarkerID
}: IMapSitterCardProps) => {

const length = rateArr.length
const aa = Math.round(Math.random()*rateArr.length)
const rate = rateArr[aa] 


  return (
    <div id={`aa-${sitter?._id}`}
                        onClick={() => {
                        handleSitterCard(sitter)
                        handleMarkerClick(sitter)
                    }
                    }
                        
                        key={sitter?._id}
                        className={`${(sitter?._id === clickedMarkerID) &&  'bg-violet-800 text-white'} cursor-pointer hover:scale-105 duration-200 p-2 px-4 flex justify-between bg-violet-400 rounded-2xl m-3 :bg-violet-800`}>
                        <div className=''>
                            <div className='text-lg font-medium' >
                                {sitter?.username}
                            </div>
              <div
              className='text-[16px] my-3'
              >
                                Distancia: {sitter.distance_to_center} km
                            </div>
                            <div className='flex gap-3 items-end my-2'>
                                <div className={` text-black! ${handleBgRateColor(rate)} p-2 w-[35px] h-[35px] flex items-center justify-center  rounded-md  font-medium `}>
                                    { rate}
                                </div>
                                    <div className='text-[18px] font-semibold'> {parseSitterRateText(rate) } </div>
                            </div>
                        </div>
                        <div className='self-center font-semibold'>
                            $1500 p/ día
                        </div>
                    </div>
  )
}

export default MapSitterCard