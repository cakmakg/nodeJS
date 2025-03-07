"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require('../models/personnel.model');

module.exports = {
    login: async (req, res) => {

        const { username, email, password } = req.body


        if ((username || email) && password) {

            const user = await Personnel.findOne({ $or: [{ username }, { email }], password });

            if (user) {

                if (user.isActive) {

                    // Set Session:
                    req.session = { id: user._id, password: user.password }

                    // Set Cookie:
                    if (req.body?.rememberMe) {
                        req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 days
                    }

                    res.status(200).send({
                        error: false,
                        user
                    });

                } else {
                    res.errorStatusCode = 401;
                    throw new Error('The user status is not active');
                }

            } else {
                res.errorStatusCode = 401;
                throw new Error('Wrong email/username or password');
            }

        } else {
            res.errorStatusCode = 401;
            throw new Error('Please anter username/email and password');
        }
    },

    logout: async () => {
        req.session = null

        res.send({
            error: false,
            maessage: "Logout is completed"
        })
    }

};