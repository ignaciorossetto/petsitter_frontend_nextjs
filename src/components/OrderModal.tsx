"use client";

import Image from "next/image";
import { Dispatch, FC, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateInterface } from "@/types/types";

type Props = {
    setOpenCreateOrder: Dispatch<boolean>;
    user: any;
    sitterId: string;
}

const datesInitialState:DateInterface = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    selected: false,
  }

const OrderModal: FC<Props> = ({setOpenCreateOrder, user, sitterId}) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [price, setPrice] = useState<number | null>(null)
  const [dates, setDates] = useState<DateInterface>(datesInitialState);

  useEffect(()=> {
    setDates(datesInitialState)
    setPrice(null)
    setOpenCalendar(false)
  }, [user])


  const handleSendProposalClick = async() => {
    try {
        const obj = {
            dates: [dates.startDate, dates.endDate],
            price: price,
            totalOfDays: calculateAmountOfDays(),
            totalPrice: calculateAmountOfDays() * price!,
            userId: user._id,
            sitterId: sitterId

        }
        console.log(obj)



    } catch (error) {
        
    }
  }

 const calculateAmountOfDays = () => {
    const startDate = new Date(dates.startDate)
    const endDate = new Date(dates.endDate)
    // To calculate the time difference of two dates
    let Difference_In_Time = endDate.getTime() - startDate.getTime();
 
    let Difference_In_Days = 
        Math.round(Difference_In_Time / (1000 * 3600 * 24));

    return Difference_In_Days
    }


  return (
    <div className="p-5 flex flex-col gap-5 relative h-[650px]">
      <button
        onClick={() => {
            setOpenCreateOrder(false);
        }}
        className="absolute top-1 right-1 rounded-full px-3 py-2 font-bold text-lg bg-red-500"
      >
        X
      </button>

      <h1 className="text-center text-2xl">Orden de cuidado</h1>
      <div className="flex flex-col xxs:flex-row gap-3 justify-around">
        <div>
          <h2 className="text-start text-xl">
            Mascota: <span className="font-semibold">Tomi</span>
          </h2>
          <h2 className="text-start text-xl">
            Tamaño: <span className="font-semibold">pequeño</span>
          </h2>
          <h2 className="text-start text-xl">
            Edad: <span className="font-semibold">pequeño</span>
          </h2>
        </div>

        <Image
          src="/maria.jpg"
          alt="img"
          height={200}
          width={200}
          className="hidden xxs:inline-block rounded-xl shadow-2xl"
        />
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="price">Precio x día</label>
        <input 
        type="number" 
        className="w-[30%] rounded-lg py-2 px-4 border-2 border-black" 
        onChange={(e)=> setPrice(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col justify-center gap-3 items-start">
        <button
          onClick={() => {
            setOpenCalendar((prev) => !prev);
          }}
          className="font-semibold bg-violet-800 text-white p-btn relative scale-animation"
        >
          Elegir fechas!
        </button>
        {openCalendar && (
          <div className="w-auto relative">
            <DateRange
              onChange={(item: any) => setDates({...item.selection, selected:false})}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
              ranges={[dates]}
            />
            <button
              onClick={() => {
                setOpenCalendar(false);
              }}
              className="absolute top-0 right-0 rounded-full px-2 py-1 bg-red-500"
            >
              X
            </button>
            <button
              onClick={() => {
                setOpenCalendar(false);
                setDates({...dates, selected:true})
              }}
              className="absolute -bottom-3 font-semibold right-0 rounded-full px-2 py-1 bg-green-500"
            >
              Confirmar
            </button>
            <button
              onClick={() => {
                setOpenCalendar(false);
              }}
              className="absolute -bottom-3 font-semibold left-0 rounded-full px-2 py-1 bg-red-500"
            >
              Cancelar
            </button>
          </div>
        )}
        {dates.selected && (
            <>
          <div className="text-[20px] flex flex-col gap-2">
            <span>Fecha inicio: {dates.startDate.toLocaleDateString()}</span>
            <span>Fecha fin: {dates.endDate.toLocaleDateString()}</span>
            <span>Cant de días: {calculateAmountOfDays()}</span>
            <span className="font-bold">
                {
                    price ? `
                    Total: $${(calculateAmountOfDays() * price).toLocaleString()}
                    ` : 
                    'Debes ingresar un precio x día'
                }
            </span>
          </div>
            <button 
            onClick={handleSendProposalClick}
            className="p-btn bg-blue-800 text-white font-semibold text-[20px] text-center scale-animation">
                Enviar propuesta
            </button>
            </>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
