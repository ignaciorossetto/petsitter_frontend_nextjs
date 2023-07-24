"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import {  FieldValues, useForm } from "react-hook-form";
import { DateRange, DateRangeProps } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios'
import { UserContext, UserContextType } from '@/hooks/auth/authContext';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface DateInterface {
  startDate: Date,
  endDate: Date,
  key: string
}

interface FormValues {
  name: string;
  type: string;
  age: string;
  sex: string;
  size: string;
  dates?: DateInterface | null;
  images: any;
  breed: string;
  desc: string;
}


const NewPetForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [loading, setLoading] = useState<boolean>(false)
  const {user, setUser, verifyAuth} = useContext<UserContextType>(UserContext)
  const [datesCheckbox, setDateCheckBox] = useState<boolean>(true);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const [date, setDate] = useState<DateInterface[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const display = async() => {
    const response = await verifyAuth()     
    if (response) {
        setLoading(false)
    }
}

useEffect(()=> {
    setLoading(true)
    display()
}, [])

  const onSubmit = async (data: any, e: any) => {
    setLoading(true)
    e.preventDefault()
    try {
    const formData = new FormData(formRef.current!);
    const dates = datesCheckbox ? [format(date[0].startDate, "dd/MM/yyyy" ), format(date[0].endDate, "dd/MM/yyyy" )] : null
    const milisecondDate:any = datesCheckbox ? Number(date[0].startDate) : null
    if (dates){
      formData?.append("dates", JSON.stringify(dates));
      formData?.append("milisecondsDates", milisecondDate);
      formData?.append("available", 'true');
    }

    formData?.append("ownerId", user._id);
    formData?.append("ownerName", user.username);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pets`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      }
    );
    setUser(response.data.payloadUser)
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: 'success',
      title: `Creaste una mascota nueva!`
    });
    router.push('/user/pets')
    setLoading(false)
  } catch (error) {
    setLoading(false)
    router.push('/error?code=2')
  }
  };



  return (
    <div className='min-h-[60vh] bg-[url(/gradient.png)] bg-cover rounded-2xl flex p-10 justify-center'>
      {loading && <FontAwesomeIcon size='2xl' icon={faSpinner} spin className=''/> }
      {!loading &&
        <form className='flex flex-col w-full sm:w-[70%]' onSubmit={handleSubmit(onSubmit)} ref={formRef}>
            <h1 className='text-4xl sm:text-5xl font-medium mb-5 text-center'>Nueva mascota</h1>
            <label className='px-3 py-4 font-medium text-xl'>Nombre mascota</label>
            <input
              {...register("name", {
                required: true,
                minLength: 2
              })}
              className=" sm:mb-0 px-3 py-4 text-lg"
              type="text"
            />
            {errors.name?.type === "required" && (
            <p className="bg-white/75 mt-2 rounded-md px-3 py-4 text-red-500">Debe ingresar nombre de mascota!</p>
          )}
          {errors.name?.type === "minLength" && (
            <p className="bg-white/75 mt-2 rounded-md px-3 py-4 text-red-500">Nombre de mascota muy corto!</p>
          )}
            <label className="px-3 py-4 font-medium text-xl">Tipo de Mascota</label>
            <select
              {...register("type", {
                required:true
              })}
              className="px-3 py-4 text-lg"
            >
              <option value="" disabled hidden defaultValue={''}>
                -
              </option>
              <option value="dog">Perro</option>
              <option value="cat">Gato</option>
            </select>
            {errors.type?.type === "required" && (
            <p className="bg-white/75 mt-2 rounded-md px-3 py-4 text-red-500">Debes elegir el tipo de mascota!</p>
          )}
          <label className="px-3 py-4 font-medium text-xl">Edad</label>
            <select
              {...register("age", {
                required:true
              })}
              className="px-3 py-4 text-lg"
            >
              <option value="" disabled hidden defaultValue={''}>
                -
              </option>
              <option value="very-young">Pequeño/a (menor a un año)</option>
              <option value="young">Joven (entre 1 y 3 años)</option>
              <option value="adult">Adult/a (entre 3 y 10 años)</option>
              <option value="elder">Anciano/a (mayor a 10 años)</option>
            </select>
            {errors.age?.type === "required" && (
            <p className="bg-white/75 mt-2 rounded-md px-3 py-4 text-red-500">Debes elegir la edad de la mascota!</p>
          )}
          <label className="px-3 py-4 font-medium text-xl">Hembra/Macho</label>
            <select
              {...register("sex", {
                required:true
              })}
              className="px-3 py-4 text-lg"
            >
              <option value="" disabled hidden defaultValue={''}>
                -
              </option>
              <option value="female">Hembra </option>
              <option value="male">Macho</option>
            </select>
            {errors.sex?.type === "required" && (
            <p className="bg-white/75 mt-2 rounded-md px-3 py-4 text-red-500">Debes elegir el sexo de la mascota!</p>
          )}
          <label className="px-3 py-4 font-medium text-xl">Tamano</label>
            <select
              {...register("size",{
                required: true
              })}
              name="size"
              className="px-3 py-4 text-lg"
            >
              <option value="" disabled hidden defaultValue={''}>
                -
              </option>
              <option value="S">Pequeno</option>
              <option value="M">Mediano</option>
              <option value="L">Grande</option>
            </select>
            {errors.size?.type === "required" && (
            <p className="bg-white/75 mt-2 rounded-md px-3 py-4 text-red-500">Debes elegir el tamano de mascota!</p>
          )}
          <label className="px-3 py-4 font-medium text-xl">
              Fechas
              <input
                {...register("dates")}
                name="dates"
                onChange={() => setDateCheckBox(!datesCheckbox)}
                checked={datesCheckbox}
                type="checkbox"
                
              />
            </label>
            <div className="px-3 py-2 text-lg">
              {datesCheckbox ? (
                <div className='flex flex-col'>
                    <div className='flex gap-3 items-baseline mb-3'>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="headerIcon"
                  />
                  <span
                    className=" "
                    onClick={() => setOpenCalendar(!openCalendar)}
                  >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                    date[0].endDate,
                    "dd/MM/yyyy"
                  )}`}</span>
                    </div>
                  {openCalendar && (
                    <DateRange
                      onChange={(item:any) => setDate([item.selection])}
                      editableDateInputs={true}
                      moveRangeOnFirstSelection={false}
                      minDate={new Date()}
                      ranges={date}
                      className="w-full sm:w-[380px]"
                    />
                  )}
                </div>
              ) : (
                <span className="checkDateFalseSpan">
                  No quiero publicar mi mascota aun!
                </span>
              )}
            </div>
            <label className="px-3 py-4 font-medium text-xl">Imagenes</label>
            <input
              {...register("images",{
                required: true
              })}
              name="images"
              className="px-3 py-4 text-lg"
              type="file"
              accept="image/*"
              capture
              multiple
            />
            {errors.images?.type === "required" && (
            <p className="bg-white/75 mt-2 rounded-md px-3 py-4 text-red-500">Debes elegir al menos una imagen!</p>
          )}
            <label className="px-3 py-4 font-medium text-xl">Raza</label>
            <input
              {...register("breed")}
              className="px-3 py-4 text-lg"
              type="text"
            />
            <label className="px-3 py-4 font-medium text-xl">Descripcion</label>
            <textarea
              {...register("desc", {
                required: true,
              })}
              name="desc"
              className="px-3 py-4 text-lg"
            />
            {errors.desc?.type === "required" && (
            <p className="bg-white/75 mt-2 rounded-md px-3 py-4 text-red-500">Debe ingresar una breve descripcion de la mascota!</p>
          )}
            <button className='mt-7 p-5 bg-violet-200 bg-right shadow-2xl font-semibold text-xl rounded-2xl hover:scale-105 hover:bg-violet-800 hover:text-white duration-200'>
                Agregar
            </button>
        </form>}
    </div>
  )
}

export default NewPetForm