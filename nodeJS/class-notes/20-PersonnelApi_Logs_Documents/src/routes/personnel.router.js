"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
const personnel = require('../controllers/personnel.controller');
const { isLogin } = require('../middlewares/permissions');
/* ------------------------------------------------------- */
// URL: /personnels


router.use(isLogin);

router.route('/').get(personnel.list).post(personnel.create);

router.route('/:id')
    .get(personnel.read)
    .put(personnel.update)
    .patch(personnel.update)
    .delete(personnel.delete);

/* ------------------------------------------------------- */
module.exports = router