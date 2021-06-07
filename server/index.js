const { isObject } = require("util");

const app = require("express")();
const http = require("http").createServer(app);
const io=require("socket.io")(http);


http.listen(5000,()=>{

    console.log("listen");
})
