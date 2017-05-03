
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

  let newExercise;
  if(!req.body.date) {
    let requestFields = {
      userId: req.body.userId,
      description: req.body.description,
      duration: req.body.duration,
    };
    newExercise = Exercise(req.body);
  } else {
    newExercise = Exercise(req.body);
  } 

  newExercise.save(function(err, exercise){
    if(err) return console.log(err);
    else {
      res.json(exercise);
    }
  });


});// end POST /add for adding exercise form data


router.get('/log', function(req, res) {

});


router.get('/all', function(req, res) {
  Exercise.find({}, function (err, exercises){
    if(err) return console.log(err);
    res.json(exercises);
  });
});// end GET /all exercises for testing



module.exports = router;
