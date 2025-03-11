"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// Swagger Autogen
// https://swagger-autogen.github.io/docs/

require('dotenv').config();

const HOST = process.env?.HOST || '127.0.0.1';
const PORT = process.env?.PORT || 8000;

/* ------------------------------------------------------- *
const options = {
    openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
    language:         <string>,     // Change response language.                      By default is 'en-US'
    disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
    autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
    autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
    autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
    writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};
/* ------------------------------------------------------- */

// const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0', language: 'tr-TR' })
const swaggerAutogen = require('swagger-autogen')();

const packageJson = require('./package.json');

const document = {

    // info: {
    //     version: '1.0.0',
    //     title: 'Personnel API',
    //     description: 'Perssonel Management System API Service v.1',
    //     termOfService: "htttp://127.0.0.1:8000/#",
    //     contact: { name: 'Clarusway', email: 'clarusway@gmail.com' },
    //     licence: { name: 'Apache Licence' }
    // }

    info: {
        version: packageJson.version,
        title: packageJson.name,
        description: packageJson.description,
        // termOfService: "htttp://127.0.0.1:8000/#",
        contact: { name: packageJson.author, email: packageJson.email },
        licence: { name: packageJson.license }
    },

    host: `${HOST}:${PORT}`,
    basePath: '/',
    schemes: ['http', 'https'],
    securityDefinitions: {
        Token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Simple Token Authentication * Example Use: <b>Token ...tokenKey...</b>'
        }
    },
    security: [{ Token: [] }],

    // paths will be created by swaggerAutogen

    definitions: {
        'Department': require('./src/models/department.model').schema.obj,
        'Personnel': require('./src/models/personnel.model').schema.obj
    }

};

// swaggerAutogen('outputFile, routes, document);
swaggerAutogen('./swagger.json', ['./index.js'], document);

