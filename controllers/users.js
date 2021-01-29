const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('crypto').randomBytes(32).toString('hex');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const ValidationError = require('../errors/validation-error');

const getUser = (req, res, next) => User.findById(req.user._id)
  .then((data) => {
    if (!data) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.send(data);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      const error = new NotFoundError('Нет пользователя с таким id');
      return next(error);
    }
    return next(err);
  });

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  if (!email || !password) {
    const err = new Error('Некорректные данные пользователя');
    err.statusCode = 400;
    return next(err);
  }

  return User.findOne({ email }).then((user) => {
    if (user) {
      const err = new Error('Пользователь уже зарегистрирован');
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
          const error = new ValidationError('Некорректные данные пользователя');
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
    const err = new Error('Некорректные данные пользователя');
    err.statusCode = 400;
    return next(err);
  }

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new Error('Некорректные данные пользователя');
        err.statusCode = 401;
        return next(err);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const err = new Error('Некорректные данные пользователя');
            err.statusCode = 401;
            return next(err);
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  getUser, createUser, userLogin, JWT_SECRET,
};
