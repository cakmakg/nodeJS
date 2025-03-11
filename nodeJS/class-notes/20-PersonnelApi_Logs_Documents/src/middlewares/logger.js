"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// Logger
// $ npm i morgan
// $ https://expressjs.com/en/resources/middleware/morgan.html

const morgan = require('morgan');

// app.use(morgan('tiny'));
// app.use(morgan('short'));
// app.use(morgan('dev'));
// app.use(morgan('common'));
// app.use(morgan('combined'));

// Custom log:
const customLog = 'TIME=":date[iso]" - URL=":url" - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)'
// app.use(morgan(customLog));

// Write to file;
// const fs = require('node:fs');
// app.use(morgan(customLog, {
//     stream: fs.createWriteStream('./examplelogs.log', { flags: 'a+' })
// }));


// Write to file - Day by Day;
const fs = require('node:fs');
const now = new Date();
// console.log(now);
const today = now.toISOString().split('T')[0]
// console.log(today) 
module.exports = morgan(customLog, {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
});