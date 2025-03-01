"use strict";
const { default: mongoose } = require('mongoose');
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const Mongoose= require('mongoose')
const dbConnection=()=>{
    mongoose.connect(process.env?.MONGO_URI)
    .then(()=>console.log('db connected'))
    .catch((err)=>console.log('db not connected', err))
}
module.exports= dbConnection