'use strict';
const app = require('./lib/server.js');
require('dotenv').config();


app.start(process.env.PORT, process.env.MONGODB_URI);


