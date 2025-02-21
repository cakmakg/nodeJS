'use strict';

/*---------------------------------------------------*
                EXPRESSJS - MIDDLEWARES
/*---------------------------------------------------*/

const express = require('express');
const app = express()

require('dotenv').config();
const PORT = process.env.PORT;

//? Middleware functions must has three parameters.
//? Last parameter is for next().

//middleware
// app.get('/', (req,res,next)=>{
//     console.log('middleware started');
//     next()
// })

// //route
// app.get('/',(req,res)=>{
//     console.log('route started');
//     res.send({message:"hello world"})
// })

// app.get('/', (req,res,next)=>{
//        if (req.query.username) {
//         req.username=req.query?.username
//         next()
//        } else {
//         res.send({
//             message:'username is required'
//         })
//        }
//          })


//       app.get('/',(req,res)=>{
//             console.log('route started');
//            res.send({message:"hello world"+ req.username})
//          })

app.get('/', (req,res,next) =>{
    req.message0= 'middleware-0 started'
    next()
})
app.get('/', (req,res,next) =>{
    req.message1= 'middleware-1 started'
    next()
})
app.get('/', (req,res,next) =>{
    req.message2= 'middleware-2 started'
    next()
})
app.get('/', (req,res,next) =>{
    req.message3= 'middleware-3 started'
    next()
})
app.get('/', (req,res,) =>{
    res.send({message1:register.message1,
        message0:register.message0,
        message2:register.message2,message3:register.message3

    })

})

// const middleFn1=(req,res,next)=>{
//     console.log('middleware function 1 started');
//     next()
// }
// const middleFn2= (req,res,next)=>{
//     console.log('middleware function 2 started');
// }
// app.use(middleFn1)
// app.use(middleFn2)

// app.get('/', (req,res)=>{
//     res.send({message: 'hello world'})
// })
app.listen(PORT, ()=> console.log('running at: http://127.0.0.1'+ PORT))