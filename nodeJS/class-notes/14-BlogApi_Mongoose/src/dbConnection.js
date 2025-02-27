"use strict";
const { default: mongoose } = require('mongoose');
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const Mongoose= require('mongoose')
const dbConnection=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/blogAPI')
    .then(()=>console.log('db connected'))
    .catch((err)=>console.log('db not connected', err))
}
module.exports= dbConnection