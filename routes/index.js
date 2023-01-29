const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const password = 'NenEENpbSQFzUiF6';
const url = `mongodb+srv://general_user:${password}@cluster0.nbp0qcd.mongodb.net/odinposts?retryWrites=true&w=majority`
mongoose.set('strictQuery',false);
mongoose.connect(url)


const postSchema = new mongoose.Schema({
  text: String,
  user: String,
  added: Date,
})

const Post = mongoose.model('posts',postSchema);

/* GET home page. */
router.get(['/','/home'], function(req, res, next) {

  Post.find({},{_id:0, __v:0}).then(results => {
    const messages = results.map(result => {
      return {text: result.text, user: result.user, added: result.added}
    });
    console.log(messages);
    res.render('../views/main', { title: "Mini Message Board", messages: messages });
  })
});

/* POST add new post & redirect to home page */
router.post('/newpost', function(req, res) {
  const { user, text }  = req.body;
  
  const newPost = new Post({
    text: text,
    user: user,
    added: new Date(),
  })

  newPost.save().then(result => {
    res.redirect('/');
  })
})

module.exports = router
