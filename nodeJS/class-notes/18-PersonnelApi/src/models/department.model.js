"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
const DeparmentSchema= new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required:true,
        unique:true
    }
},{collection:'departments', timestamps:true})

module.exports= mongoose.model('Department',DeparmentSchema)