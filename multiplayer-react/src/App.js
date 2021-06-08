  

//import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import "./App.css"
const SERVER = "http://localhost:5000";
function App() {
  const socket= io(SERVER)
	
  socket.on('connection', () => {
    console.log(`I'm connected with the back-end`);
});



	return (
		<div className="App">
      <div className="container">
		 <h1>Chat</h1>
      </div>
		</div>
	)
}

export default App