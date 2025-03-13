"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
const topping = require('../controllers/topping');

// URL: /topping ->

router.route('/')
    .get(topping.list)
    .post(topping.create);

router.route('/:userId')
    .get(topping.read)
    .put(topping.update)
    .delete(topping.delete)
/* ------------------------------------------------------- */
module.exports = router