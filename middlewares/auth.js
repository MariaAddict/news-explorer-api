const jwt = require('jsonwebtoken');
const { JWT_SECRET_DEV } = require('../config');
const AutorizstionError = require('../errors/autorization');
const { autorizstionMessage } = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AutorizstionError(autorizstionMessage));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    return next(new AutorizstionError(autorizstionMessage));
  }

  req.user = payload;

  return next();
};
