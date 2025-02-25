"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

//* Routers
const router = require('express').Router();
// Model
const Todo= require('../models/todo.models')
// List Todos:
router.get('/todo', async (req, res) => {

    const result = await Todo.findAll() // Select * From todos
    // findAndCountAll()

    res.send({
        error: false,
        result
    })
});

// Create Todo:
router.post('/todo', async (req, res) => {

    // const result = await Todo.create({
    //     title: "title-1",
    //     description: 'description-1',
    //     isDone: false,
    //     priority: 0
    // });

    const result = await Todo.create(req.body);

    res.send({
        error: false,
        result
    });
});

//TODO => READ - UPDATE - DELETE

//READ

router.get('/todo/:id', async (req,res)=>{
    // const result= await Todo.findOne({where:{id:req.params.id}})
    const result = await Todo.findByPk(req.params.id)
    res.status(202).send({
        error:false,
        result
    })
})

//UPDATE

router.put('/todo/:id', async(req,res)=>{
    const result= await Todo.update(req.body,{where:{id: req.params.id}})
    res.status(202).send({
        error:false,
        result,
        new: await Todo.findByPk(req.params.id)
    })
})

//DELETE
router.delete('/todo/:id', async (req,res)=>{


    const result= await Todo.destroy({where:{id: req.params.id}})
     // 204 status 
    // res.status(204).send({
    //     error:false,
    //     result
    // })
    if (result) {// succesful
        res.sendStatus(204)
    } else {
        throw new error('')
    }
})
module.exports= router