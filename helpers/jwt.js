const jwt = require('jsonwebtoken');

const JWTSECRET = "123";
const JWTEXPIRATION = "1800s";

function isTokenValid(req) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], JWTSECRET, (err, decode) => {
      if (err) return false;
    });
  } else {
    return false;
  }
  return true;
}

function signToken(username) {
  return jwt.sign({ username: username }, JWTSECRET, { expiresIn: JWTEXPIRATION })
}

module.exports = {
  isTokenValid: isTokenValid,
  signToken: signToken
};
