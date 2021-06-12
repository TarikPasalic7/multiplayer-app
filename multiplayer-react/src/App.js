  

import React, { useEffect,  useState } from "react"
import io from "socket.io-client"
import "./App.css"
const SERVER = "http://localhost:7000";
const socket = io(SERVER);
	
let list=[];
function App() {
  
  const [message,setMessage]= useState('');
  const [change,setChange] =useState(0);
 
useEffect(() => {
  socket.on("chat",m=>{
  
console.log("message server",m)
list.push(m);

  })
}, [change])

  const draw=(e)=>{

    let target=e.target;
    console.log(e);
    socket.emit('draw',"target");
    

  }

  const drawing =(box)=>{
box.style.backgroundColor="green";
  }

	return (
		<div className="App">
     <div id="wrapper">
      <canvas id="canvas" width="800" height="800"> </canvas>
      <div id="controls">
        <div id="widthControl" title="choose a line width">
          <div class="widthExample"></div>
          <div class="widthExample"></div>
          <div class="widthExample"></div>
          <div class="widthExample"></div>
          <div class="widthExample"></div>
        </div>
        <div id="palette" title="choose a color"></div>

        <div id="clearBtn" title="clear the canvas">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </div>

        <div id="counterDiv">
          <span id="counter">0</span> users <br />are online
        </div>
      </div>
    </div>
		</div>
	)
}

export default App