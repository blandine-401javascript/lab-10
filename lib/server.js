'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const authRouter = require('../lib/routes/auth-routes.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


// routes

app.get('/', (req, res, next) => {
  res.send('Home page');
});


app.use(authRouter);

module.exports = {
  server: app,
  start: (port, mongodb_uri) =>{
    app.listen(port, ()=>{

      console.log('Never Give Up');

      let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      mongoose.connect(mongodb_uri, options);
    });

  },
};


