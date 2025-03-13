"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
const pizza = require('../controllers/pizza');

// URL: /pizza ->

router.route('/')
    .get(pizza.list)
    .post(pizza.create);

router.route('/:userId')
    .get(pizza.read)
    .put(pizza.update)
    .delete(pizza.delete)
/* ------------------------------------------------------- */
module.exports = router