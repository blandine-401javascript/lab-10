'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth-routes.js');
const generateSwagger = require('../docs/swagger.js');
const errorHandler = require('../lib/middleware/error-handler.js');
const userModel = require('./models/users-schema.js');

const accesRouter = require('./routes/rbac-routes.js');

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
app.use(accesRouter);

/**
 * This route loads a list of users
 * @route GET /users
 * @group user
 * @returns {object} 200 - a list of users
 */
app.get('/users', async (req, res, next) => {
  const result = await userModel.read();
  res.send(result);
});


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


