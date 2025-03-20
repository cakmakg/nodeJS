"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

// Routers;

const router = require('express').Router();
const todo = require('../controllers/todo.controller');

// // List
// router.get('/todo', todo.list);

// // Create
// router.post('/todo', todo.create);

// // Read
// router.get('/todo/:id', todo.read);

// // Update
// router.put('/todo/:id', todo.update);

// // Delete
// router.delete('/todo/:id', todo.delete);

router.route('/todo')
    .get(todo.list)
    .post(todo.create);

router.route('/todo/:id')
    .get(todo.read)
    .put(todo.update)
    .delete(todo.delete)

module.exports = router;