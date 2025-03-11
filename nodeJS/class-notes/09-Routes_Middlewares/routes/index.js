'use strict';

/*---------------------------------------------------*
                EXPRESSJS - ROUTING
/*---------------------------------------------------*/
//* express.Router()
// const express = require('express');
// const router = express.Router();

const router = require('express').Router(); // shorthand

// router.get('/', (req, res) => { res.send({ message: 'Home Page' }) });
// router.get('/about', (req, res) => res.send({ message: 'About Page' }));
// router.get('/user/:id', (req, res) => res.send({ message: req.params.id }));

//* Ayni URL farkli methodlar icin;
// router.get('/', (req, res) => { res.send({ message: 'Home Page - GET' }) });
// router.post('/', (req, res) => { res.send({ message: 'Home Page - POST' }) });
// router.put('/', (req, res) => { res.send({ message: 'Home Page - PUT' }) });
// router.delete('/', (req, res) => { res.send({ message: 'Home Page - DELETE' }) });

router.route('/')
    .get((req, res) => { res.send({ message: 'Home Page - GET' }) })
    .post((req, res) => { res.send({ message: 'Home Page - POST' }) })
    .put((req, res) => { res.send({ message: 'Home Page - PUT' }) })
    .delete((req, res) => { res.send({ message: 'Home Page - DELETE' }) })

module.exports = router