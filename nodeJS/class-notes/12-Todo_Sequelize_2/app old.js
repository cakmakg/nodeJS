"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

/* 
 * npm init -y
 * npm i express dotenv express-async-errors
 * echo PORT=8000 > .env
 * npm i sequelize sqlite3
*/

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data:
app.use(express.json());

// Catch async-errors:
require('express-async-errors');

app.all('/', (req, res) => {
    res.send('WELCOME TO TODO API')
})

/* ------------------------------------------------------- */
//? Sequelize

const { Sequelize, DataTypes } = require('sequelize');

// Where is DB (DB Connnection Detail)
const sequelize = new Sequelize('sqlite:./db.sqlite3');

//* Model:
// sequelize.define('tableName', {columns})
const Todo = sequelize.define('todos', {

    // id: { // NO need to define ID field, it will be created auto.
    //     type: DataTypes.INTEGER,
    //     allowNull: false, // default:true
    //     unique: true,
    //     field: 'custom_name',
    //     comment: 'description or comment',
    //     primaryKey: true,
    //     autoIncrement: true
    // },

    title: {
        type: DataTypes.STRING(256), // varchar(256)
        allowNull: false
    },

    description: DataTypes.TEXT, // Shorthand using

    priority: { // -1:Low, 0:Normal, 1:High
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    // newField: DataTypes.TEXT

    // No need define createdAt & updatedAt fields. They are default created.

});

//* Synchorization: // This methods should run only once.
// sequelize.sync() // Create table
// sequelize.sync({ force: true }) // Drop Table & Create Table
// sequelize.sync({ alter: true }) // Backup from pervios table & Drop Table & Create Table from backup

//* DB Connection:
sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('! DB Not Connected !'));

/* ------------------------------------------------------- */
//* Routers
const router = express.Router();

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

app.use(router);
/* ------------------------------------------------------- */
const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked.')
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}
app.use(errorHandler)
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));