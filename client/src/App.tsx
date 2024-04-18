import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket |null>(null)
  const [message, setMessage] = useState<string>('')
  const [chats,setChats]=useState<string[]>([])

 
  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:5000')
    ws.onopen=()=>{
      console.log("connected")
      ws.send('Hello Server!');
    }
    ws.onmessage=(e)=>
      setChats(ch=>[...ch,e.data])
   
      
    setSocket(ws)
    return ()=>ws.close()
  },[])

  if(!socket) return <p>Loading...</p>

  function onSend() {
    if(socket){
 socket.send(message)
      setMessage('')
    }
     
  
  }

  return (
    <>
    <div >
      <div style={{width:"400px", height:"200px", padding:"2px", margin:"4px", overflowY:"auto"}}>
        {chats.map((chat,index)=><p key={index}>{chat}</p>)}
      </div>
      <textarea style={{width:"400px", padding:"2px", margin:"4px"}} value={message} onChange={(e)=>setMessage(e.target.value)}/>
      <button onClick={onSend}>Send Message</button>
      </div>
       
      
    </>
  )
}

export default App
