'use strict';

// Esoteric Resources
const express = require('express');

// Internal Resources
const Model = require('../models/model.js');
const userSchema = require('../models/users-schema.js');
const auth = require('../middleware/auth.js');

// Variables
const UsersModel = new Model(userSchema);
const router = express.Router();

// Route-wide Middleware


/**
 * This route creates a new user or rejects invalid inputs
 * @route POST /signup
 * @group user
 * @param {string} username.body.required - the username in the db for the account
 * @param {string} password.body.required - the password in the db for the account
 * @param {string} email.body - the password in the db for the account
 * @param {string} role.body.required - role of account (admin, editor or user) defaults to user
 * @returns {object} 200 - account created
 */
router.post('/signup-body', async (req, res, next) => {
  // create a user from data in req.body
  let user = await UsersModel.create(req.body);

  res.status(201);
  res.send(user);
});




/**
 * This route signs in the user or rejects invalid credentials
 * @route post /signin
 * @group user
 * @returns {object} 200 - Account Signed In
 */
router.post('/signup-headers', auth, async (req, res, next) => {
  console.log(req.user);


  if (req.user.username && !req.user._id) {
    let user = await UsersModel.create({ ...req.user, ...req.body });
    console.log(user);
    res.status(201);
    res.send(user);
    return;
  } else {
    console.log('in else');
    next({ err: 401, msg: 'User already exists' });
  }
});

router.post('/signin', auth, async (req, res, next) => {
  if (req.user._id) {
    res.status(200);
    res.send(req.user);
    return;
  } else {
    next({ err: 401, msg: 'User not found' });
  }
});



// Exports
module.exports = router;
