"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

/*------------------------------------------------------- */
//* Authentication Middleware

const User = require('../models/userModel');

module.exports = async (req, res, next) => {

    req.user = null;

    if (req?.session._id) {

        const user = await User.findOne({ _id: req.session._id });

        if (user) {

            req.user = user

        } else {
            req.session = null
        }
    }

    next()
};