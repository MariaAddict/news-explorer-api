const express = require('express');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');

const usersRouter = require('./routes/users.js');

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
    _id: '601141f9c63f2c299f47c6a5',
  };

  next();
});

app.use('/', usersRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
