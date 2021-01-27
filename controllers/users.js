const User = require('../models/user');
const NotFoundError = require('../errors/not-found');

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

module.exports = { getUser };
