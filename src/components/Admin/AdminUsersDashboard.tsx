"use client"

import { AdminContext, AdminContextType } from "@/hooks/auth/adminContext"
import { IUser } from "@/types/types"
import { getAdminUsers } from "@/utils/axiosRequests"
import axios from "axios"
import { useContext, useEffect, useState } from "react"

const AdminUsersDashboard = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState(false)
    const {admin} = useContext<AdminContextType>(AdminContext)
    const jwt = localStorage.getItem('psf-admin-jwt')

    console.log(admin)

    useEffect(() => {
        let cancelToken = axios.CancelToken.source();
            setLoading(true)
            getAdminUsers(jwt, admin._id, cancelToken).then(response => {
                setUsers(response)
                setLoading(false)
            })
            setLoading(false)
        
    }, [])


  return (
      <div
      className='min-h-[350px] justify-center flex flex-col p-3 bg-red-800/25'
      >
          <h1
          className='text-[35px]'
          >Panel de administracion de usuarios</h1>
          {loading && <span>Loading...</span>}
          <div
          className="flex flex-col gap-4"
          >
              
          {
              users.length > 0 && !loading &&users.map((user) => (
                  <div
                  key={user._id}
                  className="p-3 bg-blue-500/25 w-[750px] p-btn hover:scale-105 active:scale-100 flex gap-5"
                  >
                      <div>
                          {user.email}
                      </div>
                      <div>
                          {user._id}
                      </div>
                      
                  </div>
                  ))
                }
                </div>
    </div>
  )
}

export default AdminUsersDashboard