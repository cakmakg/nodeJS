"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// parse data
app.use(express.json())

// catch error from async
require('express-async-errors')

// const dbConnection= require('./src/dbConnection')
// dbConnection()
require('./src/dbConnection')()

//* SessionCookies
// https://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
// npm i cookie-session
const session = require('cookie-session');

app.use(session({
    secret:process.env.SECRET_KEY,
    maxAge: 1000*60*60*24*2
}))

//* Authentication Middleware
app.use(require('./src/middlewares/userControl'));

// main route
app.all('/', (req, res) => {
    res.send({
        error: false,
        message:'WELCOME TO BLOG API',
        session: req.session
    })
})

// continue from here...
// Blog & User & Auth routes
app.use('/blog', require('./src/routes/blogRouter'));
app.use('/user', require('./src/routes/userRouter'));
app.use('/auth', require('./src/routes/authRouter'));

// error handler
app.use(require('./src/middlewares/errorHandler'))

/* ------------------------------------------------------- */

app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))