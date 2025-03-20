"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ npm run dev
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

// Accept JSON:
app.use(express.json());

// Auhentication:
app.use(require('./src/middlewares/authentication'));

// Query Handler
app.use(require('./src/middlewares/queryHandler'));

// Logger:
app.use(require('./src/middlewares/logger'));

// E-MAIL
// npm i nodemailer

const nodemailer = require('nodemailer');

// Create Test Account:
 nodemailer.createTestAccount().then(email => console.log(email));

/* {

  user: 'mq6w3f4vnzfriiok@ethereal.email',
  pass: 'g9A4AM75hAfhH4rYTZ',
  smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
  imap: { host: 'imap.ethereal.email', port: 993, secure: true },
  pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
  web: 'https://ethereal.email',
  mxEnabled: false

} */
// Connect mail server

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port:587,
    secure:false,
    auth: {
        user: 'mq6w3f4vnzfriiok@ethereal.email',
        pass: 'g9A4AM75hAfhH4rYTZ'
    }
})
//console.log(transporter);

// send mail
transporter.sendMail({
    from: 'mq6w3f4vnzfriiok@ethereal.email',
    to: 'info@clarusway',
    subject:'hello clarusway',
    text: 'how are you?',
    html: "<p> hello there how are you <b>today</b></p>"
}, function (error,success){
    success? console.log('SUCCESS:', success): console.log('ERROR:', error);
})

//Gogggle Mail


/* ------------------------------------------------------- */

//* Routes:

// HomePath
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PIZZA API',
        docs: {
            swagger: "/documents/swagger",
            redoc: "/documents/redoc",
            json: "/documents/json",
        },
        user: req.user,
    })
});

// Other path
app.use('/', require('./src/routes/'));

// Static file route
// app.use('/uploads', express.static('./uploads'));
app.use('/images', express.static('./uploads'));

// Not found
app.all('*', (req, res) => {
    res.status(404).send({
        error: true,
        message: 'Route not available.'
    })
});

/* ------------------------------------------------------- */

// ErrorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
//! Syncronization (must be in commentLine):
// require('./src/helpers/sync')()