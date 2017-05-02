
const User = require('./models/user');
const Exercise = require('./models/exercise');

const express = require('express');
const router = express.Router();


router.post('/new-user', function (req, res) {

  // var newUser = new User({ username: req.body.username });
  // newUser.save(function(err, user){
  //   if(err) return console.log(err);
  //   res.json({ username: user.username, _id: user._id });
  // });
  //
  // OR
  //
  User.create({ username: req.body.username }, function(err, user){
    if(err) return console.log(err);
    res.json({ username: req.body.username, _id: user._id });
  });
});

router.get('/users', function(req, res) {
  User.find({}, '-__v', function (err, users){
    if(err) return console.log(err);
    res.json(users);
  })
});






module.exports = router;
