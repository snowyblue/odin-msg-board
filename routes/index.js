const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const password = 'NenEENpbSQFzUiF6';
const url = `mongodb+srv://general_user:${password}@cluster0.nbp0qcd.mongodb.net/odinposts?retryWrites=true&w=majority`
mongoose.set('strictQuery',false);

const postSchema = new mongoose.Schema({
  text: String,
  user: String,
  added: Date,
})

const Post = mongoose.model('posts',postSchema);

/* GET home page. */
router.get(['/','/home'], function(req, res, next) {
  mongoose.connect(url);
  Post.find({}).then(results => {
    const messages = results;
    res.render('../views/main', { title: "Mini Message Board", messages: messages });
  })
});

router.post('/newpost', function(req, res) {
  const { user, text }  = req.body;
  
  mongoose.connect(url);
  const newPost = new Post({
    text: text,
    user: user,
    added: new Date(),
  })

  newPost.save().then(result => {
    mongoose.connection.close();
    res.redirect('/');
  })
})

module.exports = router;
