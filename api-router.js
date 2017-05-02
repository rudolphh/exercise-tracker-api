
const User = require('./models/user');
const Exercise = require('./models/exercise');

const express = require('express');
const router = express.Router();


router.post('/new-user', function (req, res) {

  var newUser = new User(req.body);
  newUser.save(function(err, user){
    if(err) return console.log(err);
    res.json({ username: user.username, _id: user._id });
  });

  //
  // OR
  //
  // User.create({ username: req.body.username }, function(err, user){
  //   if(err){
  //     return console.log(err.errors);
  //   }
  //   res.json({ username: req.body.username, _id: user._id });
  // });

});// end POST /new-user for adding a new username and generate unique id


router.get('/users', function(req, res) {
  User.find({}, '-__v', function (err, users){
    if(err) return console.log(err);
    res.json(users);
  });
});// end GET /users



router.post('/add', function(req, res) {

});// end POST /add for adding exercise form data


module.exports = router;
