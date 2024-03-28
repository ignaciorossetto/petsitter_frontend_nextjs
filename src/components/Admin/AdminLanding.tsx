"use client"

import { AdminContext, AdminContextType } from "@/hooks/auth/adminContext"
import Link from "next/link"
import { useContext } from "react"

const AdminLanding = () => {
    const {admin} = useContext<AdminContextType>(AdminContext)
  return (
      <div
      className=" min-h-[350px]"
      >
          <h2
                className='text-center text-[35px] mt-10'
                >
              Bienvenido a portal admin
        </h2>
          
            {!admin &&
            <h3
                    className='text-center text-[25px] mt-10'
                    >
                        Logeate por favor
            </h3>
            }
          {
              admin && 
              <div
              className="flex justify-between gap-5"
              >
                      <div
                      className="w-[50%] h-[350px] bg-red-800/25 flex flex-col gap-5 p-5 items-start &>[button]"
                      >
                          
                          <Link href={'/admin/users'}
                              className="scale-animation p-btn bg-red-700/50 w-[180px] text-[20px] text-white text-left"
                              
                          >
                              Ver usuarios
                          </Link>     
                         <button
                         className="scale-animation p-btn bg-red-700/50 w-[180px] text-[20px] text-white text-left"
                         >Ver sitters</button>     
                         <button
                         className="scale-animation p-btn bg-red-700/50 w-[180px] text-[20px] text-white text-left"
                         >Ver mascotas</button>     
                         <button
                         className="scale-animation p-btn bg-red-700/50 w-[180px] text-[20px] text-white text-left"
                         >Ver citas</button>     
                         <button
                         className="scale-animation p-btn bg-red-700/50 w-[180px] text-[20px] text-white text-left"
                         >Citas on going</button>     
                </div>
                      <div
                      className="w-[50%] h-[350px] bg-red-800/25"
                      >
                              
                </div>
              </div>
          }
    </div>
  )
}

export default AdminLanding