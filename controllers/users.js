const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_DEV } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const ValidationError = require('../errors/validation-error');
const AutorizstionError = require('../errors/autorization');
const {
  userNotFoundMessage,
  userIsIncorrectMessage,
  userAutorizstionMessage,
} = require('../constants');

const getUser = (req, res, next) => User.findById(req.user._id)
  .then((data) => {
    if (!data) {
      throw new NotFoundError(userNotFoundMessage);
    }
    return res.send(data);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      const error = new NotFoundError(userNotFoundMessage);
      return next(error);
    }
    return next(err);
  });

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  if (!email || !password) {
    const err = new Error(userIsIncorrectMessage);
    err.statusCode = 400;
    return next(err);
  }

  return User.findOne({ email }).then((user) => {
    if (user) {
      const err = new Error(userAutorizstionMessage);
      err.statusCode = 409;
      return next(err);
    }
    return bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email, password: hash, name,
      }))
      .then((data) => res.send({
        email: data.email,
        name: data.name,
        _id: data._id,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const error = new ValidationError(userIsIncorrectMessage);
          return next(error);
        }
        return next(err);
      });
  })
    .catch(next);
};

const userLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AutorizstionError(userIsIncorrectMessage));
  }

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AutorizstionError(userIsIncorrectMessage));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new AutorizstionError(userIsIncorrectMessage));
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  getUser, createUser, userLogin,
};
