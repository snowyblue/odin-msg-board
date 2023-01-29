const express = require('express');
const router = express.Router();
const { messages } = require('./index.js')

  router.get('/', (req, res, next) => {
    res.render('../views/form');
  })

  router.post('/', function(req, res) {
    const { user, text }  = req.body
    messages.push({text: text, user: user, added: new Date()});
    res.redirect('/')
  })

module.exports = router;