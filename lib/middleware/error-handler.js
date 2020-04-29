'use strict';

const errorHandler = (error, req, res, next) => {
  console.log('in handler');
  res.status(error.err);
  res.send(error.msg);
};

module.exports= errorHandler;
