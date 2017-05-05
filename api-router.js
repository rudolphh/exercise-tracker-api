
const User = require('./models/user');
const Exercise = require('./models/exercise');

const express = require('express');
const router = express.Router();


router.post('/new-user', function (req, res, next) {

  const user = new User(req.body);
  user.save(function(err, newUser){
    //console.log(err.code);
    if(err) {
      // unique username error, status 500 internal server error
      if(err.code === 11000){
        return next(new Error('sorry, that username is taken'));
      } else {
        return next(err);
      }
    }
    res.json({ username: newUser.username, _id: newUser._id });
  });

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
    newExercise = Exercise(requestFields);
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
