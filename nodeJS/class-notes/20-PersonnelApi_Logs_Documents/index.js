"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
*/

const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// AsyncErrors to errorHandler:
require('express-async-errors');

// DB Connection:
const { dbConnection } = require('./src/configs/dbConnection');
dbConnection();

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

// Logger
app.use(require('./src/middlewares/logger'));

/* ------------------------------------------------------- *
// Logger
// $ npm i morgan
// $ https://expressjs.com/en/resources/middleware/morgan.html

const morgan = require('morgan');

// app.use(morgan('tiny'));
// app.use(morgan('short'));
// app.use(morgan('dev'));
// app.use(morgan('common'));
// app.use(morgan('combined'));

// Custom log:
const customLog = 'TIME=":date[iso]" - URL=":url" - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)'
// app.use(morgan(customLog));

// Write to file;
// const fs = require('node:fs');
// app.use(morgan(customLog, {
//     stream: fs.createWriteStream('./examplelogs.log', { flags: 'a+' })
// }));


// Write to file - Day by Day;
const fs = require('node:fs');
const now = new Date();
// console.log(now);
const today = now.toISOString().split('T')[0]
// console.log(today)
app.use(morgan(customLog, {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
}));
/* ------------------------------------------------------- */

// DOCUMENTATION:
// $ npm i swagger-autogen # JSON Creator
// $ npm i swagger-ui-express
// $ npm i redoc-express

// Json
app.use('/documents/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' })
});

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./swagger.json');
app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }));

// Redoc
const redoc = require('redoc-express');
app.use('/documents/redoc', redoc({ specUrl: '/documents/json', title: 'Redoc UI' }));



/* ------------------------------------------------------- */
//* Routes:

// Home path
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: "Welcome to Personnel API Service",
        // session: req.session
        user: req.user,
        documents: {
            swagger:'http://127.0.0.1:8000/documents/swagger',
            redoc:'http://127.0.0.1:8000/documents/redoc',
            json:'http://127.0.0.1:8000/documents/json',
        }
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