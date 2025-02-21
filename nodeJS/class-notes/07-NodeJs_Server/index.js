"use strict"

//' $ npm install dotenv

require('dotenv').config(); //? .env dosyasındaki verileri process.env içine yükler.

const PORT = process.env?.PORT || 8000
const HOST = process.env?.HOST || "127.0.0.1"

const http = require("node:http") //? http modülünü çağırır. Bu nodejs in içindedir.

const app = http.createServer((req,res)=>{ //? Piyasa standartı app olarak isimlnedirilir.
   
//    console.log(req); //' gelen HTTP isteğini tüm detaylarıyla yazdırır.
   console.log("--------------------")
//   if(req.url == "/"){
//     res.end('<h1> welcome </h1>')
//   } 
// else if (req.url == "/blogs"){
//     res.end('<h1> Listelenen Bloglar </h1>')
//   } 
// else if (req.url == "/newBlog"){
//     res.end('<h1> Yeni blog ekle </h1>')
//   }

 //*-----------------------------------------------------------------------------//

    //  if(req.url == "/"){
    //     res.write('this')
    //     res.write('is')
    //     res.write('home')
    //     res.write('page')
    //     res.write('  ')
    //     res.write('welcome to clarusway')
    //  }
    //  res.end()
   
    if(req.url == "/"){
        if(req.method == 'GET') { //* default zaten gettir.
            res.end('<h1> Welcome to HomePage </h1>')
        }

        else if(req.method == 'POST') { //* eğer ki methodumuz post ise;
       res.statusCode = 400
       res.statusMessage = "Post yapamazsin" //* mesaj döndürür, türkçe karakter olmamalı
       res.end('cannot post methods') //* tarayıcıya mesaj gönderir
        }

        else if (req.method == 'DELETE'){
         res.writeHead(405, "silme yapamazsin",{
            "Content-Type" : "text/html", //* Yanıtın içeriğinin html olduğunu belirtir.
            "another-header" : "another content ", //*Özel bir header ekler
            // "another-header1" : "another content " ,//*Özel bir header ekler
            // "another-header2" : "another content " //*Özel bir header ekler
         })
         res.end('can not this method')

        }
        else
        res.end('can not use this method')
    }
    else if(req.url == "/list"){
        const obj = {
            "error" : false,
            "message " : "this is list page",

        }
        res.end(JSON. stringify(obj))
    }
    else if(req.url == '/test'){
        res.end('<h1> Test page </h1>')
    }


})

app.listen(PORT, ()=> console.log(`server running : http://${HOST}:${PORT}`)) //' Belirtilen HOST ve PORT  üzerinden sunucuyu başlatır.
