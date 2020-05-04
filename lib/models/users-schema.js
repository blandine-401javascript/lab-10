'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

const schema = mongoose.Schema({
  username: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  email: { type: 'String' },
  role: {type: 'String', required: true, default: 'user', enum: ['admin', 'editor', 'user']},
});


schema.pre('save', async function() {
  // hash for pass
  console.log(this);

  this.password = await bcrypt.hash(this.password, 10);

});

schema.methods.comparePassword = async function (password) {
  const match = bcrypt.compare(password, this.password);
  return match;
};

schema.methods.generateToken = async function (exp) {
  const token = jwt.sign(
    {
      data: { id: this.id, username: this.username, role: this.role },
    },
    process.env.JWT_SECRET || 'BAD_SECRET',
    { expiresIn: exp || 0 },
  );
  return token;
};

schema.statics.verifyToken = async function (token) {
  const content = jwt.verify(token, process.env.JWT_SECRET || 'BAD_SECRET');
  return content.data;
};

const userModel = mongoose.model('users', schema);

module.exports = userModel;
