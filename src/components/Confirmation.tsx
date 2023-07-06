import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHome, faMailBulk, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";

const Confirmation = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [reSendMailTick, setReSendMailTick] = useState(false)
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [reSendBtn, setReSendBtn] = useState(false);

  const handleResendEmailBtn = async() => {
    const obj = {email: email}
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resendConfirmationMail` , obj)
      if (response) {
        setReSendMailTick(true)
        setReSendBtn(true)
        setMessage('El mensaje se envio correctamente')
      }
    } catch (error) {
      setMessage('Error al enviar mensaje')
    }
  }



  useEffect(() => {
    setLoading(true);
      const checkAccount = async () => {
      const obj = {
        token: token,
        email: email,
      };
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/checkAccount`,
          obj
        );
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Cuenta verificada exitosamente!'
        });
        setReSendMailTick(true)
        setMessage(`Cuenta verificada correctamente!`)
        setLoading(false);
      } catch (error: any) {
        const { status, message } = error?.response.data;
        switch (status) {
          case 404:
            setMessage("El usuario no existe");
            break;
          case 400:
            setMessage("El usuario ya está confirmado!");
            break;
          default:
            if (message.includes('expired')) {
              setMessage("El token expiró!");
              setReSendBtn(true);
              break;
            }
            if (message.includes('Unexpected token')) {
              setMessage("El token es erroneo!");
              setReSendBtn(true);
              break;
            }

            setMessage("Error en el servidor! Intenta más tarde...");
            break;
        }
        setErrorMsg(true);
        setLoading(false);
      }
    };
    checkAccount();
  }, []);
  return (
    <>
        <>
          <FontAwesomeIcon className={`${!loading && "hidden"} w-24 h-24`} icon={faSpinner} size="2xl" spin />
          <div className="p-10 text-2xl font-medium">
            {message}{reSendMailTick && <FontAwesomeIcon icon={faCheck} className="ml-3 h-8 w-8 text-green-400" />}
          </div>
          {reSendBtn && <button className="p-10 mb-10 text-center text-xl font-medium flex items-end gap-2 bg-violet-400 rounded-2xl hover:scale-105 duration-200" onClick={handleResendEmailBtn}>Click para reenviar mail <FontAwesomeIcon icon={faEnvelope} className="h-8 w-8 text-orange-800" /> </button>}
          {(errorMsg ||reSendMailTick)  && <h3 className='p-2 text-center text-2xl font-semibold'>Ir a <Link href={'/'}><FontAwesomeIcon className='hover:scale-105 duration-200' icon={faHome}/></Link></h3>}
        </>
      
    </>
  );
};

export default Confirmation;
