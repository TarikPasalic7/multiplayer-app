const { Socket } = require('dgram');

const app=require('express')();
const server=require('http').createServer(app);
const io = require('socket.io')(server,{
cors:{
    origin:'*',
}

})

io.on('connection',socket=>{


  console.log('connected');
  socket.on('message',payload=>{

    console.log('Message recieved on ',payload);
    io.emit('message',payload);
  })

})


server.listen(7000,()=>{

    console.log("listening to port 7000")
})