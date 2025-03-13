"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
const order = require('../controllers/order');

// URL: /order ->

router.route('/')
    .get(order.list)
    .post(order.create);

router.route('/:userId')
    .get(order.read)
    .put(order.update)
    .delete(order.delete)
/* ------------------------------------------------------- */
module.exports = router