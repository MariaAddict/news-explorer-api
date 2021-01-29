const router = require('express').Router();
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');
const {
  validateCreateArticle, validateDeleteArticle,
} = require('../middlewares/validation');

router.get('/articles', getArticles);
router.post('/articles', validateCreateArticle, createArticle);
router.delete('/articles/:articleId', validateDeleteArticle, deleteArticle);

module.exports = router;
