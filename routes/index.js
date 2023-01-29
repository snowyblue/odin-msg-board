const express = require('express');
const router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get(['/', '/home'], function(req, res, next) {
  res.render('../views/main', { title: "Mini Message Board", messages: messages });
});

module.exports = {indexRouter: router, messages: messages}
