'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const authRouter = require('../lib/routes/auth-routes.js');
const generateSwagger = require('../docs/swagger.js');
const errorHandler = require('../lib/middleware/error-handler.js');

const app = express();

generateSwagger(app);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


// routes
/**
 * This route gives us a simple "Homepage" message
 * @route GET /
 * @returns {String} 200 - The string "Homepage"
 */
app.get('/', (req, res, next) => {
  res.send('Home page');
});


app.use(authRouter);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port, mongodb_uri) =>{
    app.listen(port, ()=>{

      console.log('Never Give Up');

      let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      };
      mongoose.connect(mongodb_uri, options);
    });

  },
};


