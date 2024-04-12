"use client"
import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import OrderForm from "@/components/OrderForm"

const page = () => {
  return (
    <>
      <NavBar />
        <OrderForm />
      <Footer/>
    </>
  )
}

export default page