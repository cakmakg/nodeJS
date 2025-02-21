"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
/* npm init -y
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

const{Sequelize, DataTypes}= require('sequelize');

// where is DB
const sequelize = new Sequelize('sqlite:./db.sqLite3')

//* Model:
// sequelize.define('tableName', {columns})
const Todo= sequelize.define('todos', {
    // id:{
    //     type: DataTypes.INTEGER,
    //     allowNull:false,
    //     unique: true,
    //     field:'todo_id',
    //     comment:'description or comment',
    //     primaryKey: true,
    //     autoIncrement:true
    // },
    title:{
        type: DataTypes.STRING(256),// varchar(256)
        allowNull: false,

    },
    descriptin: DataTypes.TEXT, 

    priority:{
        type:DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    isDone:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
    },
    // No need define createdAt update fields. They are default created.

})

//* Synchorization: // This methods should run only once.
// sequelize.sync() // Create table
// sequelize.sync({ force: true }) // Drop Table & Create Table
// sequelize.sync({ alter: true }) // Backup from pervios table & Drop Table & Create Table from backup

//* DB connection
sequelize.authenticate()
.then(()=>console.log('* db connected*'))
.catch(()=>console.log('*db not connected*'))

//* routers
const router= express.Router();
// list todos
router.get('/todo', async(req,res)=>{
  const result= await Todo.findAll()// select * from todos
   res.send({
    error:false,
    result
   })
})

// create todo
router.post('/todo', async(req,res)=>{
//    const result= await Todo.create({
//         title:"title-1",
//         description:'description-1',
//         isDone: false,
//         priority:0
//     })
const result = await Todo.create(req.body);
    res.send({
        error:false,
        result
    })
})
app.use(router)
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