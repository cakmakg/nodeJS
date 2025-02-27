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

// main route
app.all('/', (req, res) => {
    res.send('WELCOME TO BLOG API')
})

// continue from here...
// Blog route
app.use(require('./src/routes/blogRouter'));

// error handler
app.use(require('./src/middlewares/errorHandler'))

/* ------------------------------------------------------- */

app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))