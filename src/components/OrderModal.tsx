"use client";

import Image from "next/image";
import {  Dispatch, FC, useContext, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateInterface } from "@/types/types";
import { UserContext } from "@/hooks/auth/authContext";
import { calculateAmountOfDays, formatPetAge, formatPetSize } from "@/utils/utilsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import config from "@/utils/config";


type Props = {
    setOpenCreateOrder: Dispatch<boolean>;
    user: any;
    sitterId: any;
}

interface Pet {
  _id: string;
  name: string;
  size: string;
  age: string;
  images: [string];
  confirmed: boolean;
  // Add other properties as needed
}

interface Price {
  price: number | null;
  confirmed: boolean;
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
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<Price>({
    price: null,
    confirmed: false,
  })
  const { socket } = useContext(UserContext);

 


  useEffect(()=> {
    setDates(datesInitialState)
    setPrice(null)
    setOpenCalendar(false)
  }, [user])


  const handleSendProposalClick = async() => {
    try {
        const obj = {
            dates: [dates?.startDate, dates?.endDate],
            price: price,
            totalOfDays: calculateAmountOfDays(dates),
            totalPrice: calculateAmountOfDays(dates) * price!,
            userId: user?._id,
            sitterId: sitterId._id,
            petId: selectedPet!._id

        }
        console.log(obj)
        socket.current.emit("sendProposal", obj);



    } catch (error) {
        
    }
  }

  const handlePetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedPetObject = user.pets.find((p: Pet) => p._id === selectedValue);
    setSelectedPet({...selectedPetObject, confirmed: false});
  };




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
      <div className="flex flex-col xxs:flex-row gap-10 justify-start items-center">
        <div className="flex flex-col gap-3 self-center">
          {
            !selectedPet?.confirmed ? 
            <div className="text-start text-xl">
            Mascota: <span className="font-semibold">
                <select 
                name="pet" 
                id=""
                className=""
                onChange={handlePetChange}
                >
                    <option value="" selected disabled>-</option>
                    {user.pets.map((p:any) => 
                    <option 
                    key={p._id}
                    value={p._id}
                    >
                        {p.name}
                    </option>
                    )}
                </select>
            </span>
          </div> : 
          <div
          className="text-start text-xl font-semibold">
            Mascota: {selectedPet!.name}
          </div>
                  }
          {
            selectedPet && <div className="flex flex-col gap-3">
            <h2 className="text-start text-xl">
              Tamaño: <span className="font-semibold">{formatPetSize(selectedPet.size)}</span>
            </h2>
            <h2 className="text-start text-xl">
              Edad: <span className="font-semibold">{formatPetAge(selectedPet.age)}</span>
            </h2>
            {!selectedPet.confirmed ? 

            <button
            className="p-btn scale-animation bg-violet-500 font-bold text-white"
            onClick={()=> setSelectedPet({...selectedPet, confirmed: true})}
            >
              Confirmar mascota
            </button>
            :
            <button
            className="p-btn scale-animation bg-green-800 font-bold text-white"
            onClick={()=> setSelectedPet({...selectedPet, confirmed: false})}
            >
              Cambiar mascota
            </button>
            }
            </div>
          }
        </div>
        {
          selectedPet && 
        <div className="w-[200px] h-[200px]">
            <Image
            src={selectedPet?.images[0]}
            alt="img"
            height={200}
            width={200}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className="cover hidden xxs:inline-block rounded-xl shadow-2xl"
            />
        </div>
      }
      </div>
      {
        selectedPet?.confirmed && 
      <div className="flex gap-3 items-center">
        <label htmlFor="price">Precio x día</label>
        {
          selectedPrice.confirmed ? 
            <span
            className="font-semibold text-[20px] "
            >
              ${selectedPrice.price?.toLocaleString()}
              </span>
            :
              <input 
              type="number" 
              className="w-[30%] rounded-lg py-2 px-4 border-2 border-black" 
              onChange={(e)=> setSelectedPrice({price: Number(e.target.value), confirmed: false})}
              />

        }
        {
            !selectedPrice.confirmed ?
        <button
          className="font-semibold bg-violet-800 text-white p-btn relative scale-animation"
          onClick={()=> setSelectedPrice({...selectedPrice, confirmed: true})}
        >
           Confirmar tarifa diaria
        </button>
        :
        <button
          className="font-semibold bg-green-800 text-white p-btn relative scale-animation"
          onClick={()=> setSelectedPrice({...selectedPrice, confirmed: false})}
        >
           Cambiar tarifa
        </button>
          }
      </div>
      }
      
      <div className="flex flex-col justify-center gap-3 items-start">
      {
        selectedPrice.confirmed && 
        <>
        {
          dates.selected ? 
          <button
            className="font-semibold bg-green-800 text-white p-btn relative scale-animation"
            onClick={()=> {
              setDates(datesInitialState)
            }}
          >
            <FontAwesomeIcon icon={faCalendar}/> Cambiar fechas
          </button>
          :
        <button
          onClick={() => {
            setOpenCalendar((prev) => !prev);
          }}
          className="font-semibold bg-violet-800 text-white p-btn relative scale-animation"
          >
          <FontAwesomeIcon icon={faCalendar}/> Elegir fechas!
        </button>
        }
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
          </>

        }

        {dates.selected && (
          <>
          <div className="text-[20px] flex flex-col gap-2">
            <span>Fecha inicio: {dates.startDate.toLocaleDateString()}</span>
            <span>Fecha fin: {dates.endDate.toLocaleDateString()}</span>
            <span>Cant de días: {calculateAmountOfDays(dates)}</span>
            <span className="font-bold">
                {
                  selectedPrice.price ? `
                    Total: $${(calculateAmountOfDays(dates) * selectedPrice.price).toLocaleString()}
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
