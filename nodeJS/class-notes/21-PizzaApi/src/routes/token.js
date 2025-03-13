"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
const token = require('../controllers/token');

// URL: /token ->

router.route('/')
    .get(token.list)
    .post(token.create);

router.route('/:userId')
    .get(token.read)
    .put(token.update)
    .delete(token.delete)
/* ------------------------------------------------------- */
module.exports = router