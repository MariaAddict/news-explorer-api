const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /https?:\/\/(w{3})?\.?[0-9A-Za-z\-._~:/?#[\]@!$&'()*,+;=]#?/g.test(v);
      },
      message: 'Неправильный url',
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return /https?:\/\/(w{3})?\.?[0-9A-Za-z\-._~:/?#[\]@!$&'()*,+;=]#?/g.test(v);
      },
      message: 'Неправильный url',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('article', articleSchema);
