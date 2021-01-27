const Article = require('../models/article');
const NotFoundError = require('../errors/not-found');

const getArticles = (req, res, next) => {
  Article.find()
    .populate('user')
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Карточки не подтянулись');
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new NotFoundError('Карточки не подтянулись');
        return next(error);
      }
      return next(err);
    });
};

module.exports = {
  getArticles,
  // createArticle, deleteArticle
};
