const express = require('express');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');

const usersRouter = require('./routes/users.js');
const articlesRouter = require('./routes/articles');
const NotFoundError = require('./errors/not-found');

const app = express();
mongoose.connect('mongodb://localhost:27017/news-explorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6013dde3806cccb036422717',
  };

  next();
});

app.use('/', usersRouter);
app.use('/', articlesRouter);

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
