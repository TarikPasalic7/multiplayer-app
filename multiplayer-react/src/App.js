  

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
	
let list=[];
function App() {
  
  const [message,setMessage]= useState('');
  const [change,setChange] =useState(0);

 
useEffect(() => {
  
 canvas = document.getElementById("canvas");
 ctx = canvas.getContext("2d");
 createPalette();
 canvas.addEventListener("mousedown", (e) => {
  mousePressed = true;
  draw(e);
});

canvas.addEventListener("mousemove", (e) => {
  if (mousePressed) {
      draw(e);
  }
});

canvas.addEventListener("mouseleave", () => {
  lastPos = null;
});

document.addEventListener("mouseup", (e) => {
  mousePressed = false;
  lastPos = null;
});

document.getElementById("clearBtn").addEventListener("click", () => {
  socket.emit("clearCanvas");
});
socket.on("clearCanvas", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

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