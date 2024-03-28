import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import OrderForm from "@/components/OrderForm"
import UserDashboard from "@/components/UserDashboard"

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