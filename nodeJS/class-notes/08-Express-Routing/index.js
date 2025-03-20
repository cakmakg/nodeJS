'use strict';
/* ------------------------------------------------------- *
                Express & Routing
/* ------------------------------------------------------- */

// https://expressjs.com/

//* npm init -y => create package.json
//* npm i express dotenv

/* ExpressJs Start */

const express = require('express'); // Assign expressFramework to express variable.

const app = express(); // Run application on express.

//? Env
require('dotenv').config();
const PORT = process.env.PORT;
/* ------------------------------------------------------- */

//? HTTP_METHODS & URLS;
// app.get('/', (req, res) => res.end("called in 'get' method."));
// app.post('/', (req, res) => res.end("called in 'post' method."));
// app.put('/', (req, res) => res.end("called in 'put' method."));
// app.patch('/', (req, res) => res.end("called in 'patch' method."));
// app.delete('/', (req, res) => res.end("called in 'delete' method."));

//* Tum methodlara izin ver;
// app.all('/', (req, res) => res.end("called in 'all' method."));

//* app.route('url')
// app.route('/')
//     .get((req, res) => res.send({ method: 'GET' }))
//     .post((req, res) => res.send({ method: 'POST' }))
//     .put((req, res) => res.send({ method: 'PUT' }))
//     .delete((req, res) => res.send({ method: 'DELETE' }));

/* ------------------------------------------------------- *
//? URL (Path) Options:

app.get('/', (req,res)=> res.send("in 'root' path")) // '/' == root
app.get('/path', (req, res) => res.send("in path")) // '/path' == '/path/'
//* express-urls supported JokerChar;
app.get('/abc(x?)123', (req, res) => res.send("in abc(x?)123")) // abc123 or abcx123
app.get('/abc(x+)123', (req, res) => res.send("in abc(x+)123")) // abc123 or abcx...xxx123
app.get('/abc*123', (req, res) => res.send("in abc*123")) // abc123 or abc(ANY)123
//* express-urls supported regexp;
app.get(/xyz/, (req, res) => res.send("regexp /xyz/")) // url contains = 'xyz'
app.get(/^\/xyz/, (req, res) => res.send("regexp /^xyz/")) // url starts with = 'xyz'
app.get(/xyz$/, (req, res) => res.send("regexp /xyz$/")) // url ends with = 'xyz'

/* ------------------------------------------------------- *
//? URL Parameters;
app.get('/blogs/:blogId/:author/search/*', (req, res) => {

    // console.log(req); // request bir obje yapisindadir ve icindeki degerlere nokta '.' notasyonuyla ulabilirz.

    res.send({
        blogId: req.params.blogId,
        query: req.query.title,
        url: {
            protocol: req.protocol,
            subdomains: req.subdomains,
            hostname: req.hostname,
            params: req.params,
            query: req.query,
            // baseUrl: req.baseUrl, // deprecated.
            path: req.path,
            origninalUrls: req.originalUrl
        }
    });
});

//* '\d' means only digit-chars in regexp
// app.get('/user/:userId([0-9]+)', (req, res) => {
app.get('/user/:userId(\\d+)', (req, res) => {
    res.send({
        params: req.params
    })
})

/* ------------------------------------------------------- *

//? Response Methods;
app.get('/', (req, res) => {

    //* sendStatus()
    // res.sendStatus(401)

    //* status()
    // res.status(202)
    // res.send({
    //     error: false,
    //     msg:'Response Methods'
    // })

    res.status(202).send({
        error: false,
        msg: 'Response Methods'
    });

})

//* Status Codes
app.get('/status-codes', (req, res) => res.send({ message: 'OK' })) // Default status code : 200 
app.post('/status-codes', (req, res) => res.status(201).send({ message: 'Created' }))  // post - 201
app.put('/status-codes', (req, res) => res.status(202).send({ message: 'Accepted' }))  // put - 202
app.delete('/status-codes', (req, res) => res.status(204).send({ message: 'No Content' }))  // delete - 204
/* ------------------------------------------------------- */

//? Download File;
app.get('/download', (req, res) => res.download('./index.js', 'chagendName.txt'));

//? Redirect;
app.get('/redirect', (req, res) => res.redirect(301, 'https://www.clarusway.com'));
app.get('/redirect-temp', (req, res) => res.redirect(302, 'https://www.google.com'));

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log('Running at: http://127.0.0.1:' + PORT))

// Happy Coding..



