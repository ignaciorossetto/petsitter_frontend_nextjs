"use client"
import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import OrderForm from "@/components/OrderForm"
import { Suspense } from "react"

const page = () => {
  return (
    <Suspense>
    <NavBar />
      <OrderForm />
    <Footer/>
    </Suspense>
  )
}

export default page