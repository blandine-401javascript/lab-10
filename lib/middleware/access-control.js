'use strict';

let roles = {
  user: ['read'],
  editor: ['read', 'create', 'update'],
  admin: ['read', 'create', 'update', 'delete'],
};

const caps = (capabilities) => {
  return (req, res, next) => {
    capabilities.forEach((capability) => {
      if (!roles[req.user.role].includes(capability)) {
        return next({
          status: 403,
          message: 'permission denied',
        });
      }
    });
    return next();
  };
};

module.exports = caps;
