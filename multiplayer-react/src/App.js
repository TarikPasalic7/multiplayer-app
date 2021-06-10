  

import React, { useEffect,  useState } from "react"
import io from "socket.io-client"
import "./App.css"
const SERVER = "http://localhost:7000";
const socket = io(SERVER);
	
let list=[];
function App() {
  
  const [message,setMessage]= useState('');
  const [chat,setChat] = useState([]);
  const [change,setChange] =useState(0);
 
useEffect(() => {
  socket.on("chat",m=>{
  
console.log("message server",m)
list.push(m);

  })
}, [change])

  const sendMessage =(e)=>{

    e.preventDefault();
    console.log(message);
    socket.emit('message',`${message}`)
  
    setMessage("");
    setChange(0);
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
     
     {list.map((data, index) => {
      
      return (<div key={index} >{data}</div> ) 
    })}
      </div>
		</div>
	)
}

export default App