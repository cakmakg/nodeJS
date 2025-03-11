"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
//* Authentication control middleware

const Token = require('../models/token.model');

module.exports = async (req, res, next) => {

    req.user = null;

    // Authorization: Token ...tokenKey...
    // Authorization: ApiKey ...tokenKey...
    // Authorization: Bearer ...tokenKey...
    // Authorization: Auth ...tokenKey...
    // Authorization: X-API-KEY ...tokenKey...
    // Authorization: x-auth-token ...tokenKey...

    // Get token from headers;
    // console.log(req.headers.authorization.split(' ')[1]);

    const auth = req.headers.authorization || null; // Token ...TokenKey...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...TokenKey...' ]

    if (tokenKey && tokenKey[0] == "Token") {

        const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId');
        // console.log(tokenData);

        if (tokenData) req.user = tokenData.userId

    };

    // console.log(req.user);

    next()
};
