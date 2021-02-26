const { celebrate, Joi } = require('celebrate');

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(1).max(30),
    title: Joi.string().required().min(1).max(100),
    text: Joi.string().required().min(1),
    date: Joi.string(),
    source: Joi.string().required().min(1).max(30),
    link: Joi.string().required().pattern(/https?:\/\/(w{3})?\.?[0-9A-Za-z\-._~:/?#[\]@!$&'()*,+;=]#?/),
    image: Joi.string().required().pattern(/https?:\/\/(w{3})?\.?[0-9A-Za-z\-._~:/?#[\]@!$&'()*,+;=]#?/),
  }),
});

const validateDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  validateUserLogin, validateCreateUser, validateCreateArticle, validateDeleteArticle,
};
