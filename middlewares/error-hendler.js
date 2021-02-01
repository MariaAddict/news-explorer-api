const { serverMessage } = require('../constants');

const errorHendler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: serverMessage });
  next();
};

module.exports = errorHendler;
