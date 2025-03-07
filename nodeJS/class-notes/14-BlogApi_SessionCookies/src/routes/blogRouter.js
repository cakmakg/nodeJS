"use strict"

const router= require('express').Router()

const {blogCategory, blogPost} = require('../controllers/blogController')

/* ------------------------------------------------------- */
// URL: /blog/category ->

router.route('/category')

    .get(blogCategory.list)
    .post(blogCategory.create)

    router.route('/category/:categoryId')
    .get(blogCategory.read)
    .put(blogCategory.update)
    .delete(blogCategory.delete)

/* ------------------------------------------------------- */
// URL: /blog/category ->

router.route('/post')

    .get(blogPost.list)
    .post(blogPost.create)

    router.route('/post/:postId')
    .get(blogPost.read)
    .put(blogPost.update)
    .delete(blogPost.delete)

/* ------------------------------------------------------- */
module.exports = router;