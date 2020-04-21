'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: {type: 'string', unique: true, require: true},
  password: {type: 'string', require: true},
  fname: {type: 'string'},
  lname: {type: 'string'},
});


module.exports = mongoose.model('users', schema);
