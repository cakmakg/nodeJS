"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
//* Mongoose ODM

const mongoose = require('mongoose');

const dbConnection = () => {

    mongoose.connect(process.env?.MONGO_URI || 'mongodb://127.0.0.1:27017/blogAPI')
        .then(() => console.log('* DB Connected *'))
        .catch((err) => console.log('! DB Not Connected !', err))
};

module.exports = dbConnection