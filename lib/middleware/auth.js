const bcrypt = require('bcrypt');
const Model = require('../models/model.js');
const userSchema = require('../models/users-schema.js');
const UsersModel = new Model(userSchema);

const base64Decoder = (encodedString) => {
  let data = {
    username: '',
    password: '',
  };

  let decodedString = Buffer.from(encodedString, 'base64').toString();
  let dataPieces = decodedString.split(':');

  data.username = dataPieces[0];
  data.password = dataPieces[1];

  return data;
};

let getUserFromCredentials = async (userData) => {
  let possibleUsers = await UsersModel.readByQuery({
    username: userData.username,
  });

  for (let i = 0; i < possibleUsers.length; i++) {
    let isSame = await bcrypt.compare(
      userData.password,
      possibleUsers[i].password,
    );

    if (isSame) {
      return possibleUsers[i];
    }
  }
  return userData;
};

const auth = async (req, res, next) => {
  let authPieces = req.headers.authorization.split(' ');
  console.log('authPieces', authPieces);


  if (authPieces.length === 2) {
    if (authPieces[0] === 'Basic') {
      let authData = base64Decoder(authPieces[1]);

      req.user = await getUserFromCredentials(authData);

      next();
      return;
    }
  }

  next();
};

module.exports = auth;
