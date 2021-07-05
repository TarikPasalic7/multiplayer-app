  

import React, { useEffect,  useState } from "react"
import io from "socket.io-client"
import "./App.css"

const SERVER = "http://localhost:7000";
const socket = io(SERVER);
let mousePressed = false;
let lastPos = null;
let drawColor = "black";
let lineWidth = 15;
let canvas=null;
let ctx=null;
let board=null;
	let gs="";
let list=[];
function App() {
  
  const [guesstxt,setGuesstxt]= useState('');
  const [change,setChange] =useState(0);

 
useEffect(() => {
  board =  document.getElementById("guessboard"); 
 canvas = document.getElementById("canvas");
 ctx = canvas.getContext("2d");
 createPalette();

document.querySelectorAll(".colorSquare").forEach((square) => {
  square.addEventListener("click", () => {
      drawColor = square.style.backgroundColor;
      document.querySelectorAll(".widthExample").forEach((ex) => {
          ex.style.backgroundColor = drawColor;
      });
  });
});



document.querySelectorAll(".widthExample").forEach((ex) => {
  ex.addEventListener("click", () => {
      lineWidth = ex.clientWidth;
      document.querySelectorAll(".widthExample").forEach((other) => {
          other.style.opacity = 0.4;
      });
      ex.style.opacity = 1;
  });
});

socket.on("socketNumber", (number) => {
  document.getElementById("counter").innerText = number;
});

}, [])

useEffect(() => {

  socket.on("txt",(msg)=>{
    const txt = document.createElement("div");
   txt.innerHTML=msg;
   txt.classList.add("guesstxt");
   board.appendChild(txt);
 console.log(msg)

 })
}, [guesstxt])

const mousedwn=(e)=>{
  mousePressed = true;
  draw(e);

}
const mousemv =(e)=>{
  if (mousePressed) {
    draw(e);
}

}
const mouselv =()=>{
  lastPos = null;
}
const msup =()=>{
  mousePressed = false;
  lastPos = null;
}
const clear =()=>{
  socket.emit("clearCanvas");
  
}
socket.on("clearCanvas", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const createPalette=()=> {
  const COLORS = [
      "black",
      "gray",
      "silver",
      "white",
      "lightblue",
      "cyan",
      "blue",
      "darkblue",
      "purple",
      "magenta",
      "red",
      "orange",
      "yellow",
      "lime",
      "green",
      "olive",
      "brown",
      "maroon",
  ];
  const palette = document.getElementById("palette");
  COLORS.forEach((colorName) => {
      const colorElement = document.createElement("div");
      colorElement.classList.add("colorSquare");
      colorElement.style.backgroundColor = colorName;
      palette.appendChild(colorElement);
  });
}



  const draw=(e)=>{

    const [x, y] = mousePos(e);
    if (lastPos) {
        socket.emit("drawing", drawColor, lineWidth, lastPos, [x, y]);
        lastPos = [x, y];
    } else {
        lastPos = [x, y];
        socket.emit("drawing", drawColor, lineWidth, lastPos, [x, y]);
    }
    

  }
  const guess=(e)=>{
  
  
  socket.emit("guess",gs);
  setGuesstxt("");
  
  


  }

 socket.on("drawing", (color, width, startPos, endPos) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.moveTo(...startPos);
  ctx.lineTo(...endPos);
  ctx.closePath();
  ctx.stroke();
});

function mousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return [
      (e.clientX - rect.left) * (canvas.width / rect.width),
      (e.clientY - rect.top) * (canvas.height / rect.height),
  ];
}




	return (
		<div className="App">
     <div id="wrapper">
      <div className="boardwraper">
      <div className="guessboard" id="guessboard">
      </div>
      <div className="wraper2">
        <input type="text" placeholder="Guess"  onChange={(e)=>{gs=e.target.value;}} />
      <button className="guessbtn" onClick={guess} >GUESS</button>

      </div>
     
       </div>
       <div className="container">  <canvas id="canvas" onMouseDown={mousedwn} onMouseMove={mousemv} onMouseLeave={mouselv} onMouseUp={msup} width="900" height="700"> </canvas></div>
    
      <div id="controls">
        <div id="widthControl" title="choose a line width">
          <div className="widthExample"></div>
          <div className="widthExample"></div>
          <div className="widthExample"></div>
          <div className="widthExample"></div>
          <div className="widthExample"></div>
        </div>
        <div id="palette" title="choose a color"></div>

        <div id="clearBtn" title="clear the canvas">
          <button onClick={clear}>Clear</button>
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