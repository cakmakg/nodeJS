"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BUILTIN MIDDLEWARES
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
//? Data receiving

//* Read & Parse json data
app.use(express.json());

//* Read text data
app.use(express.text());

//* Read form data
app.use(express.urlencoded({ extended: true }));

app.all('/', (req, res) => {

    res.send({
        error: false,
        params: req.params,
        query: req.query,
        headers: req.headers,
        body: req.body
    })
});

//* StaticFiles:
// app.use('/images', express.static('./images'));
app.use('/public', express.static('./images'));

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));