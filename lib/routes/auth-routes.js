'use strict';


const express = require('express');

const Model = require('../models/model.js');
const userSchema = require('../models/users-schema.js');


const UsersModel = new Model(userSchema);
const router = express.Router();



router.post('/signup', (req, res, next) => {

  // create a uer
  res.send('signup');
});


router.post('/signin', (req, res, next) => {
  res.send('signin');
});




module.exports = router;

