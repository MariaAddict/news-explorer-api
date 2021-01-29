const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { createUser, userLogin } = require('../controllers/users');

router.post('/signin', userLogin);
router.post('/signup', createUser);
router.use('/', usersRouter);
router.use('/', articlesRouter);

module.exports = router;
