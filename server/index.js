const { Socket } = require('dgram');

const app=require('express')();
const server=require('http').createServer(app);
const io = require('socket.io')(server,{
cors:{
    origin:'*',
}

})

let socketNumber = 0;

const drawQueue = [];

io.on("connect", socket => {
  socketNumber++;

  io.emit("socketNumber", socketNumber);

  drawQueue.forEach(([...args]) => socket.emit("drawing", ...args));

  socket.on("clearCanvas", () => {
    drawQueue.length = 0;
    io.emit("clearCanvas");
  });

  socket.on("drawing", (...args) => {
    drawQueue.push([...args]);
    io.emit("drawing", ...args);
  });

  socket.on("disconnect", () => {
    socketNumber--;
    io.emit("socketNumber", socketNumber);
  });
});


server.listen(7000,()=>{

    console.log("listening to port 7000")
})