"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const app = express()

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// AsyncErrors to errorHandler:
require('express-async-errors')

//dbConnection

const {dbConnectio, dbConnection}= require("./src/configs/dbConnection")
dbConnection()
/* ------------------------------------------------------- */
//*middleware
// Accept JSON:
app.use(express.json())

// Query Handler
app.use(require('./src/middlewares/findSearchSortPage'))
// cookie-session

app.use(require('cookie-session')({
    secret: process.env.SECRET_KEY,
}))


/* ------------------------------------------------------- */
//*Routes:
//Homepath
app.all('/',(req,res)=>{
    res.send({
        error:false,
        message: "Welcome to personel API service",
        session:req.session
    })
})
//Department
app.use("/departments", require('./src/routes/department.router'));
//Personnels
app.use("/personnels", require('./src/routes/personnel.router'));



/* ------------------------------------------------------- */
// ErrorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()