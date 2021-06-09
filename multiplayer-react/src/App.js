  

import React, { useEffect,  useState } from "react"
import io from "socket.io-client"
import "./App.css"
const SERVER = "http://localhost:7000";
const socket = io(SERVER);
	

function App() {
  const [message,setMessage]= useState('')
  const sendMessage =(e)=>{

    e.preventDefault();
    console.log(message);
    socket.emit('message',{message})
    setMessage("");
  }

	return (
		<div className="App">
      <div className="container">
		 <h1>Chat</h1>

     <form onSubmit={sendMessage}>
   <input type="text" 
   name="message"
    placeholder="type message" 
    value={message}
    onChange={(e)=>{setMessage(e.target.value)}}
    />
<button type='submit'>Send</button>

     </form>
      </div>
		</div>
	)
}

export default App