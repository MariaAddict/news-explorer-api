const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { createUser, userLogin } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found');
const {
  validateUserLogin, validateCreateUser,
} = require('../middlewares/validation');

router.post('/signin', validateUserLogin, userLogin);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/', usersRouter);
router.use('/', articlesRouter);

router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
