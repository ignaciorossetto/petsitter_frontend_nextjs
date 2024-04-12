import Messenger from '@/components/Messenger'
import NavBar from '@/components/NavBar'

const Chat = (prop:any) => {
    

  return (
    <>
    <NavBar />
    <Messenger type='user'/>
    </>
  )
}

export default Chat