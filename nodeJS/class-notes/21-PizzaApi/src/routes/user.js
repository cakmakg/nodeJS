"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
const user = require('../controllers/user');

// URL: /user ->

router.route('/')
    .get(user.list)
    .post(user.create);

router.route('/:userId')
    .get(user.read)
    .put(user.update)
    .patch(user.update)
    .delete(user.delete)
/* ------------------------------------------------------- */
module.exports = router