const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { createUser } = require('../controllers/users');

router.post('/signup', createUser);
router.use('/', usersRouter);
router.use('/', articlesRouter);

module.exports = router;
