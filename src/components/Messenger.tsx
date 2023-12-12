"use client";
import { UserContext } from "@/hooks/auth/authContext";
import {
  faArrowLeft,
  faPaw,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import Conversation from "./Conversation";
import Message from "./Message";
import { MessageType } from "@/types/types";
import useAuthRequest from "@/hooks/auth/useAuthRequest";
import {
  getConversations,
  getMessages,
  getPendingOngoingCareOrder,
  postMessage,
} from "@/utils/axiosRequests";
import axios from "axios";
import OrderModal from "./OrderModal";
import Swal from "sweetalert2";
import { json } from "stream/consumers";
import { calculateAmountOfDays } from "@/utils/utilsFunctions";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import config from "@/utils/config";



type SitterProposalType = {
    totalOfDays: number;
    totalPrice: number;
    userId: string;
    sitterId: string;
    startDate: string;
    endDate: string;
    preferenceId: string;

}


const Messenger = ({ type = "user" }: { type: string }) => {
  const { user, socket } = useContext(UserContext);
  const searchParams = useSearchParams();
  let [messages, setMessages] = useState<MessageType[]>([]);
  let [arrivalMessage, setArrivalMessage] = useState<MessageType | null>(null);
  const [selectedConv, setSelectedConv] = useState<any>(null);
  const [selectedReceiver, setSelectedReceiver] = useState<any>(null);
  const router = useRouter();
  const [conversationsArray, setConversationsArray] = useState<any>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingConversationsMenu, setLoadingConversationsMenu] =
    useState(false);
  const [msgBox, setMsgBox] = useState("");
  const [openCreateOrder, setOpenCreateOrder] = useState(false)
  const scrollRef = useRef<HTMLDivElement | undefined>();
  const { verifyToken } = useAuthRequest();
  const [sitterProposal, setSitterProposal] = useState<SitterProposalType | null>(null)
  const [openSitterProposal, setOpenSitterProposal] = useState(false)
  const [preferenceId, setPreferenceId] = useState<string | null>(null)


  const handleConfirm = () => {
    // Handle navigation here
    router.push('/user/pets'); // Replace with your desired route
  };

  useEffect(() => {
    initMercadoPago(config.mpPublicKey!, { locale: 'es-AR' });
  }, []);


  const display = async (): Promise<void> => {
    setLoadingConversationsMenu(true);
    const response = await verifyToken();
    if (response) {
      setLoadingConversationsMenu(false);
      return;
    } else {
      router.push("/error?code=1");
      setLoadingConversationsMenu(false);
    }
  };
  useEffect(() => {
    display();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    socket.current.on("getMessage", (data: any) => {
      setArrivalMessage({
        sender: data?.senderId,
        text: data?.message,
        createdAt: Date.now(),
      });
    });
  }, [socket]);
  useEffect(() => {
    socket.current.on("getProposal", (data: any) => {
      Swal.fire({
        html: `
        <h1 id="toastTitle">Nueva propuesta de cuidado recibida!</h1> 
        <button 
        id="customButton"
        >
        Ver
        </button>`,
        toast: true,
        position: 'top-right',
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
        didOpen: () => {
          // Attach a click event to the custom button
          const customButton = document.getElementById('customButton');
          const toastTitle = document.getElementById('toastTitle');
          if (customButton) {
            customButton.addEventListener('click', handleConfirm);
            customButton.style.padding = '10px';
            customButton.style.fontSize = '18px';
            customButton.style.color = 'white';
            customButton.style.backgroundColor = 'purple';
            customButton.style.borderRadius = '20px';
            customButton.style.fontWeight = 'bold';
            toastTitle!.style.fontWeight = 'bold';
            toastTitle!.style.fontSize = '22px';
            toastTitle!.style.marginBottom = '5px';
          }
        },
      });
      const dates = data?.message?.dates
      console.log(data.message.sitterId)
      setSitterProposal({
        startDate: new Date(dates[0]).toLocaleDateString(),
        endDate: new Date(dates[1]).toLocaleDateString(),
        totalOfDays: data.message.totalOfDays,
        totalPrice: data.message.totalPrice,
        userId: data.message.userId,
        sitterId: data.message.sitterId,
        preferenceId: ''
      });
    });
  }, [socket]);

  // Conditions to set displayed messages
  useEffect(() => {
    if (
      arrivalMessage !== null &&
      arrivalMessage.sender === selectedReceiver?._id
    ) {
      setMessages((prev: any) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, selectedConv, selectedReceiver]);

  const handleSendMsgEnter = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key !== "Enter") {
      return;
    }
    const obj: MessageType = {
      conversationId: selectedConv,
      sender: user._id,
      text: msgBox,
    };
    const socketObj = {
      senderId: user._id,
      otherUserId: selectedReceiver?._id,
      message: msgBox,
    };
    try {
      const jwt = localStorage.getItem("psf-jwt");
      socket.current.emit("sendMessage", socketObj);
      await postMessage(jwt, obj);
      setMessages([...messages, obj]);
    } catch (error) {
      router.push("/error?code=1");
    } finally {
      setMsgBox("");
    }
  };

  const handleSendMsg = async (e: React.MouseEvent<HTMLDivElement>) => {
    const obj: MessageType = {
      conversationId: selectedConv,
      sender: user._id,
      text: msgBox,
    };
    const socketObj = {
      senderId: user._id,
      otherUserId: selectedReceiver?._id,
      message: msgBox,
    };
    try {
      const jwt = localStorage.getItem("psf-jwt");
      socket.current.emit("sendMessage", socketObj);
      await postMessage(jwt, obj);
      setMessages([...messages, obj]);
    } catch (error) {
      router.push("/error?code=1");
    } finally {
      setMsgBox("");
    }
  };

  const fetchConversations = async () => {
    setLoadingConversationsMenu(true);
    try {
      const jwt = localStorage.getItem("psf-jwt");
      const data = await getConversations(jwt, user._id);
      setConversationsArray(data);
      setLoadingConversationsMenu(false);
    } catch (error) {
      router.push("/error?code=1");
      setLoadingConversationsMenu(false);
    }
  };

  console.log('aa', config.mpPublicKey)

  useEffect(() => {
    const cid = searchParams.get("cid") || null;
    const sid = searchParams.get("sid") || null;
    fetchConversations();
    setSelectedReceiver({ _id: sid });
    setSelectedConv(cid);
  }, []);

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    if (selectedConv) {
      setLoadingMessages(true);
      const jwt = localStorage.getItem("psf-jwt");

      getMessages(jwt, selectedConv, cancelToken)
        .then(async(data) => {

          setMessages(data);
          setLoadingMessages(false);
            try {
              const sitterId = type !== 'sitter' ? selectedReceiver?._id : user?._id
              const userId = type !== 'sitter' ? user?._id : selectedReceiver?._id
              const [order, preferenceId] = await getPendingOngoingCareOrder(jwt, sitterId, userId)
              if (!order) return setSitterProposal(null)
              console.log(preferenceId)
              setSitterProposal({
                startDate: new Date(order.dates[0]).toLocaleDateString(),
                endDate: new Date(order.dates[1]).toLocaleDateString(),
                totalOfDays: calculateAmountOfDays({startDate: order.dates[0], endDate: order.dates[1]}),
                totalPrice: order.paymentInfo.totalPrice,
                userId: order.userId,
                sitterId: order.sitterId,
                preferenceId: preferenceId
              });
              setPreferenceId(preferenceId)
            } catch (error) {
              console.log(error)
              return router.push("/error?code=1");;        
            }
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            return router.push("/error?code=1");;
          }
          router.push("/error?code=1");
          setLoadingMessages(false);
        });
    }

    return () => {
      cancelToken.cancel();
    };
  }, [selectedConv]);

  return (
    <section className="w-full h-[80vh] flex justify-center">
      <div
        className={`${
          !selectedConv ? "flex" : "hidden"
        } w-full sm:w-[35%] h-full ${
          type !== "sitter"
            ? "bg-violet-500/95"
            : "bg-gradient-to-tr from-lime-500 to-emerald-700 "
        }  py-3 sm:p-10 sm:flex flex-col items-center gap-4 overflow-y-auto overflow-x-hidden`}
      >
        <h1 className="text-3xl text-center font-medium mb-5 text-white">
          Últimos chats
        </h1>

        {!loadingConversationsMenu ? (
          conversationsArray?.map((e: any, index: any) => (
            <Conversation
              type={type}
              key={index}
              conv={e}
              setSelectedReceiver={setSelectedReceiver}
              selectedConv={selectedConv}
              setSelectedConv={setSelectedConv}
              receiverID={e?.members.filter((e: any) => e !== user?._id)}
              setOpenCreateOrder={setOpenCreateOrder}
            />
          ))
        ) : (
          <div className="flex justify-center items-center">
            <FontAwesomeIcon
              icon={faSpinner}
              size="2xl"
              spin
              className="h-16 w-16 mt-20"
            />
          </div>
        )}
      </div>
      <div
        className={`${selectedConv ? "flex" : "hidden"} w-full sm:w-[65%] 
    ${
      type === "sitter"
        ? "sm:bg-gradient-to-tr from-lime-400 to-emerald-300"
        : "bg-white sm:bg-violet-300"
    } sm:p-10 sm:flex flex-col gap-4 none relative`}
      >
      {
            selectedConv &&
           <>
           
        {type === 'sitter' && !sitterProposal && <>
        {openCreateOrder && 
        <div className="bg-white z-[2] w-full rounded-xl">
          <OrderModal setOpenCreateOrder={setOpenCreateOrder} sitterId={user} user={selectedReceiver}/>
        </div>
        }
        {
          !openCreateOrder && 
        <button 
        onClick={()=> setOpenCreateOrder((prev)=> !prev)}
        className="p-btn font-bold bg-white rounded-xl w-fit text-start scale-animation"
        >
                Crear propuesta
        </button>
        }
            
        </>
        }
        {
          type === 'sitter' && sitterProposal && 
          <button 
                className="p-btn bg-white w-fit font-semibold text-[20px] scale-animation"
                onClick={()=> {
                  setPreferenceId(sitterProposal.preferenceId)
                  setOpenSitterProposal((prev)=>!prev)

                }}
                >
                Ver Propuesta
            </button>
        }
        {
          type !== 'sitter' && 
          <>
            {
              sitterProposal && selectedReceiver._id === sitterProposal?.sitterId  ?
              <button 
                className="p-btn bg-white w-fit font-semibold text-[20px] scale-animation"
                onClick={()=> {
                  setOpenSitterProposal((prev)=>!prev)

                }}
                >
                Ver Propuesta
              </button> :
              <p className="p-btn bg-white/75  w-fit font-semibold text-[20px]">
                Propuesta pendiente...
              </p> 
            }
            </>
        }
        {
          openSitterProposal && sitterProposal && 
          <div className="h-[500px] w-full bg-white text-[20px] p-5 relative">
              <button 
              className="px-3 py-1 rounded-full scale-animation bg-red-500 font-bold absolute -top-2 -right-2"
              onClick={()=> {
                setOpenSitterProposal((prev)=> !prev)}
              }
              >
                X
              </button>
              <div>Nombre mascota: Tomi</div>
              <div>Comienzo estadía: {sitterProposal.startDate}</div>
              <div>Final estadía: {sitterProposal.endDate}</div>
              <div>Total de días: {sitterProposal.totalOfDays}</div>
              <div>Precio total: ${sitterProposal.totalPrice.toLocaleString()}</div>
              <br />
              {
                type !== 'sitter' ? 
                <>
                {
                  preferenceId && 
                  <div className="w-[300px]">
                      <Wallet initialization={{preferenceId: sitterProposal.preferenceId}}/>
                  </div>
                }
                </>
              :
              <div>
                <button
                className="bg-red-800 p-btn scale-animation text-white font-semibold text-[20px]"
                >
                  Eliminar
                </button>
              </div>
            }

          </div>
        }
        <div className="w-full h-[85%] bg-violet-100 sm:rounded-2xl shadow-2xl  flex flex-col overflow-scroll overflow-x-hidden overflow-y-hidden">
          
          <div className="flex sm:hidden gap-5 justify-between items-center p-5 bg-white/100 mb-5">
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="xl"
              className="hover:scale-110 duration-200 cursor-pointer"
              onClick={() => setSelectedConv(null)}
              />
            <h1 className="font-bold text-xl">{selectedReceiver?.username}</h1>
            <div>
              <button onClick={()=> setOpenCreateOrder((prev)=> !prev)}>
                Crear propuesta
              </button>
            </div>
          </div>
          {
            !openCreateOrder && 
            <div
            className={`w-full h-full ${type === 'sitter' ? 'bg-white' : 'bg-violet-100 sm:bg-white'} sm:rounded-2xl shadow-2xl  flex flex-col overflow-scroll overflow-x-hidden`}
          >
            {!loadingMessages ? (
              messages.length === 0 ? 
              <div className="font-semibold italic text-[20px] text-gray-800/75 text-center mt-20 p-5">
                Escribe tu primer mensaje...
              </div> :
              messages?.map((element: any, index: any) => (
                <Message key={index} message={element} scrollRef={scrollRef} />
                ))
            ) : (
              <div className="flex mt-20 justify-center items-center">
                <FontAwesomeIcon
                  icon={faSpinner}
                  size="2xl"
                  spin
                  className="w-16 h-16"
                  />
              </div>
            )}
          </div>
          }
        </div>

        {
          !openCreateOrder && 
          
          <div className="w-full h-[15%] flex gap-3">
          <textarea
          value={msgBox}
          onKeyDown={handleSendMsgEnter}
          placeholder="Escribe aqui...."
          onChange={(e) => setMsgBox(e.target.value)}
            name="message"
            className={`w-[85%] sm:w-[80%] p-2 ${type === 'sitter' ? 'bg-white' : 'bg-violet-100 sm:bg-white '}
              sm:rounded-2xl shadow-2xl sm:p-5 text-lg font-medium resize-none`}
              />
              <div
              onClick={handleSendMsg}
              className={`w-[15%] flex sm:w-[20%] sm:h-full ${type !== 'sitter' ? 'bg-lime-300/75' : ''} rounded-full mr-2 mb-2 sm:m-0 shadow-2xl  p-2 sm:p-5 justify-center items-center hover:scale-105 sm:hover:scale-110 duration-200 cursor-pointer`}
          >
          <FontAwesomeIcon
          icon={faPaw}
          className="text-orange-800 w-8 h-8"
          />
          </div>
          </div>
        }
        
            </>
      } 
      {
        !selectedConv && 
        <div className=" text-center font-semibold text-[20px] mt-20 p-5 rounded-xl bg-white/75 ">
          Selecciona una conversacion para chatear!
          <p>=)</p>
        </div>
      }
      </div>
    </section>
  );
};

export default Messenger;
