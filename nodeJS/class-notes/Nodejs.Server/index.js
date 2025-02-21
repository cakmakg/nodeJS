"use strict"

require('dotenv').config();

const PORT=process.env.Port || 8000
const HOST = process.env.HOST || "127.0.0.1"

const http = require("node:http")
const app= http.createServer((req,res)=>{
   // console.log(req);
    console.log("---------")
    if(req.url=="/"){
        res.end('<h1>welcome</h1>')

    }else if(register.url=="/blogs"){
        res.end('')
    }

})
app.listen(PORT,()=> console.log(`server running: http://${HOST}:${PORT}`))