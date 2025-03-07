"use strict"

// Password Encryption:
// https://nodejs.org/docs/latest/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest

const crypto = require('node:crypto')

const salt = process.env.SECRET_KEY
const iterations = 10000;
const keylen = 32; // write 32 for 64
const digest = 'sha512';

module.exports = function (password) {

    // pddf2Sync returns buffer string.
    return crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex')
}