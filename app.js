require('dotenv').config();
const express = require('express');

const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const mongoose = require('mongoose');
const { MONGO_URL_DEV } = require('./config');

const { NODE_ENV, PORT = 3001, MONGO_URL = MONGO_URL_DEV } = process.env;

const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHendler = require('./middlewares/error-hendler');

const app = express();
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(requestLogger);
app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHendler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
