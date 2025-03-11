"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Call Models:
const { BlogCategory, BlogPost } = require('../models/blogModel');

/* ------------------------------------------------------- */
// BlogCategory Controller:
module.exports.blogCategory = {

    list: async (req, res) => {

        const result = await BlogCategory.find();

        res.status(200).send({
            error: false,
            result
        })
    },

    // CRUD ->

    create: async (req, res) => {

        const result = await BlogCategory.create(req.body);

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {

        // await BlogCategory.findOne({...filter})
        // const result = await BlogCategory.findOne({ _id: req.params.categoryId });
        const result = await BlogCategory.findById(req.params.categoryId);

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {

        // await BlogCategory.updateOne({...filter},{...data})

        //* response from updateOne : {
        // "acknowledged": true, // if update methods ends successfuly
        // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
        // "upsertedId": null,
        // "upsertedCount": 0,
        // "matchedCount": 1 // number of data matches with our filter.
        // }

        const result = await BlogCategory.updateOne({ _id: req.params.categoryId }, req.body);


        res.status(202).send({
            error: false,
            result,
            new: await BlogCategory.findById(req.params.categoryId)
        })
    },

    delete: async (req, res) => {

        // await BlogCategory.deleteOne({...filter})

        //* response from deleteOne : {
        // "acknowledged": true, // if delete methods ends successfuly 
        // "deletedCount": 1, // if returns 0 : no any data delete cause data is not found or already deleted.
        // }
        const result = await BlogCategory.deleteOne({ _id: req.params.categoryId })

        if (result.deletedCount) {
            res.sendStatus(204)
        } else {
            res.errorStatusCode = 404
            throw new Error('Data is not found or already deleted.')
        }
    },
};

/* ------------------------------------------------------- */
// BlogPost Controller:
module.exports.blogPost = {

    list: async (req, res) => {

        // await BlogPost.find({...filter},{...select})
        // const result = await BlogPost.find();

        //* the field you want display give true value. _id default is true
        //* the field you want to expand with more detail, send the name of in populate method.
        const result = await BlogPost.find({}, { categoryId: true, title: true, content: true }).populate('categoryId');

        res.status(200).send({
            error: false,
            result
        })
    },

    // CRUD ->

    create: async (req, res) => {

        const result = await BlogPost.create(req.body);

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {

        // await BlogPost.findOne({...filter})
        // const result = await BlogPost.findOne({ _id: req.params.blogId });
        const result = await BlogPost.findById(req.params.postId).populate('categoryId');

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {

        // await BlogPost.updateOne({...filter},{...data})

        //* response from updateOne : {
        // "acknowledged": true, // if update methods ends successfuly
        // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
        // "upsertedId": null,
        // "upsertedCount": 0,
        // "matchedCount": 1 // number of data matches with our filter.
        // }

        const result = await BlogPost.updateOne({ _id: req.params.blogId }, req.body);


        res.status(202).send({
            error: false,
            result,
            new: await BlogPost.findById(req.params.blogId)
        })
    },

    delete: async (req, res) => {

        // await BlogPost.deleteOne({...filter})

        //* response from deleteOne : {
        // "acknowledged": true, // if delete methods ends successfuly 
        // "deletedCount": 1, // if returns 0 : no any data delete cause data is not found or already deleted.
        // }
        const result = await BlogPost.deleteOne({ _id: req.params.blogId })

        if (result.deletedCount) {
            res.sendStatus(204)
        } else {
            res.errorStatusCode = 404
            throw new Error('Data is not found or already deleted.')
        }
    },
};

// module.exports = { blogCategory, blogPost }
