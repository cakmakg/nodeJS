"use strict";
const { BlogPost } = require('../models/blogModel');
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// Call Model;

const User = require('../models/userModel');

/* ------------------------------------------------------- */

module.exports = {

    list: async (req, res) => {

        // const result = await User.find();
       const result= await res.getModelList(User)

        res.status(200).send({
            error: false,
            details: await res.getModelList(User),
            result
        })
    },

    // CRUD ->

    create: async (req, res) => {

        if (req.body.password.length < 8) {
            res.errorStatusCode = 400
            throw new Error('The password must be more than 8 character.')
        }

        const result = await User.create(req.body);

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {

        // await User.findOne({...filter})
        // const result = await User.findOne({ _id: req.params.userId });
        const result = await User.findById(req.params.userId);

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {

        // await User.updateOne({...filter},{...data})

        //* response from updateOne : {
        // "acknowledged": true, // if update methods ends successfuly
        // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
        // "upsertedId": null,
        // "upsertedCount": 0,
        // "matchedCount": 1 // number of data matches with our filter.
        // }

        const result = await User.updateOne({ _id: req.params.userId }, req.body);


        res.status(202).send({
            error: false,
            result,
            new: await User.findById(req.params.userId)
        })
    },

    delete: async (req, res) => {

        // await User.deleteOne({...filter})

        //* response from deleteOne : {
        // "acknowledged": true, // if delete methods ends successfuly 
        // "deletedCount": 1, // if returns 0 : no any data delete cause data is not found or already deleted.
        // }
        const result = await User.deleteOne({ _id: req.params.userId })

        if (result.deletedCount) {
            res.sendStatus(204)
        } else {
            res.errorStatusCode = 404
            throw new Error('Data is not found or already deleted.')
        }
    },
};