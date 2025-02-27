"use strict"

const router=require('express').Router()

const blogCategory = require('../controllers/blogController')

/* ------------------------------------------------------- */
// URL: /blog ->

router.route('/blog')

    .get(blogCategory.list)

/* ------------------------------------------------------- */
module.exports = router;