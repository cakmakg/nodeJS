"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
*/

const express = require('express')
const app = express()

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// AsyncErrors to errorHandler:
require('express-async-errors');

// DB Connection:
const { dbConnection } = require('./src/configs/dbConnection');
dbConnection()

/* ------------------------------------------------------- */
//* Middlewares:

// Accept JSON
app.use(express.json());

// Query Handler
app.use(require('./src/middlewares/findSearchSortPage'));

// Cookie-Session
app.use(require('cookie-session')({
    secret: process.env.SECRET_KEY,
    // cookie: {
    //     secure: true, // this is accept only https
    //     httpOnly: false, // this is for XSS Cross Site Scripting
    //     maxAge: 24 * 60 * 60 * 1000, // 24 hours
    //   }
}));

// Authentication Middleware
app.use(require('./src/middlewares/authentication'));

//logger
app.use(require('./src/middlewares/logger'))

//DOCUMENTATION
//$ npm i swagger-autogen JSON creator
// JSON
app.use('/documents/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' })
});
/* ------------------------------------------------------- *


const morgan= require('morgan')
//app.use(morgan('tiny'))
//app.use(morgan('short'))
//app.use(morgan('dev'))
//app.use(morgan('common'))
//app.use(morgan('combined'))

//* cumtom log
//app.use(morgan());

const customLog= 'TIME=":date[iso]" - URL=":url" - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)'
// write to file
// const fs= require('node:fs')
// app.use(morgan(customLog, {
//     stream: fs.createWriteStream('./examplelogs.log',{flags: 'a+'})
// }))

// write to file day by day
const fs= require('node:fs')
const now= new Date()
const today= now.toISOString().split('T')[0]
app.use(morgan(customLog, {
 stream: fs.createWriteStream(`./logs/${today}.log`, {flags: 'a+'})
  }))
/* ------------------------------------------------------- */
//* Routes:

// Home path
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: "Welcome to Personnel API Service",
        // session: req.session
        user: req.user
    })
});



// Auth
app.use("/auth", require('./src/routes/auth.router'));
// Tokens
app.use("/tokens", require('./src/routes/token.router'));
// Departments
app.use("/departments", require('./src/routes/department.router'));
// Personnels
app.use("/personnels", require('./src/routes/personnel.router'));


// Not found
app.all('*', (req, res) => {
    res.status(404).send({
        error: true,
        message: 'Route not available.'
    })
});



/* ------------------------------------------------------- */
// ErrorHandler:
app.use(require('./src/middlewares/errorHandler'));

// RUN SERVER:
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT));

/* ------------------------------------------------------- */
//! Syncronization (must be in commentLine):
// require('./src/helpers/sync')()