const { expressjwt: jwt } = require('express-jwt');

function getTokenFromHeaders(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }

  return null;

  //example of the authorization header with Bearer token
  //{authorization: "Bearer 098765resdgfchvjbknjop9u8y7t6rytfuio"}
}

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders,
});

module.exports = {
  isAuthenticated,
};