const Article = require('../models/article');
const NotFoundError = require('../errors/not-found');
const ValidationError = require('../errors/validation-error');
const {
  articlesNotFoundMessage, articleIsIncorrectMessage, articleNotFoundMessage, notOwnerMessage,
} = require('../constants');

const getArticles = (req, res, next) => {
  Article.find()
    .populate('user')
    .then((data) => {
      if (!data) {
        throw new NotFoundError(articleNotFoundMessage);
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new NotFoundError(articleNotFoundMessage);
        return next(error);
      }
      return next(err);
    });
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError(articleIsIncorrectMessage);
        return next(error);
      }
      return next(err);
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(articlesNotFoundMessage);
      }
      if (JSON.stringify(article.owner) === JSON.stringify(req.user._id)) {
        return Article.findByIdAndRemove(req.params.articleId).then((data) => res.send(data));
      }
      const err = new Error(notOwnerMessage);
      err.statusCode = 403;
      return next(err);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new NotFoundError(articlesNotFoundMessage);
        return next(error);
      }
      return next(err);
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
