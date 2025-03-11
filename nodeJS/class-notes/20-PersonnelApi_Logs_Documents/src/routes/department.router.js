"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router();
const department = require('../controllers/department.controller');
const { isLogin, isAdmin } = require('../middlewares/permissions');
/* ------------------------------------------------------- */
// URL: /departments

router.route('/')
    .get(isLogin, department.list)
    .post(isAdmin, department.create);

router.route('/:id')
    .get(isLogin, department.read)
    .put(isAdmin, department.update)
    .patch(isAdmin, department.update)
    .delete(isAdmin, department.delete);

/* ------------------------------------------------------- */
module.exports = router;