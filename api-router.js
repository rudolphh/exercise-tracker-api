
const User = require('./models/user');
const Exercise = require('./models/exercise');

const express = require('express');
const router = express.Router();


router.post('/new-user', function (req, res, next) {

  const user = new User(req.body);
  user.save(function(err, newUser){

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



router.get('/users', function(req, res, next) {
  User.find({}, '-__v', function (err, users){
    if(err) return next(err);
    res.json(users);
  });
});// end GET /users


router.post('/add', function(req, res, next) {

  User.findById(req.body.userId, '-__v', function(err, user){
    if(err) { return next(err); }

    if(!user){ return next(new Error('unknown _id')); }

    // if no date remove property so mongoose uses specified default
    if(!req.body.date) { delete req.body.date; }
    req.body.username = user.username;

    const newExercise = Exercise(req.body);
    newExercise.save(function(err, exercise){
      if(err) return next(err);

      const savedExercise = {
        username: exercise.username,
        description: exercise.description,
        duration: exercise.duration,
        _id: user._id,
        date: exercise.date.toDateString()
      }

      res.json(savedExercise);
    });

  });// end findById

});// end POST /add for adding exercise form data


router.get('/log', function(req, res, next) {

    // for testing ryiTnqBkW userId for chloe
    // for testing ryPRhqBkb userId for lily

  User.findById(req.query.userId, '-__v', function(err, user){
    if(err) return next(err);
    if(!user) return next(new Error('unknown _id'));

    console.log('from: %s', req.query.from);
    console.log('to: %s', req.query.to);
    console.log('limit: %s', req.query.limit);

    const from = new Date(req.query.from);
    const to = new Date(req.query.to);

    console.log('from date: %s', from);
    console.log('to date: %s', to);

    Exercise.find({
      userId: user._id,
      date: { $gte: !isNaN(from) ? from.getTime() : 0,
        $lt: !isNaN(to) ? to.getTime() : Date.now() }
    }, '-_id').sort('-date').limit(parseInt(req.query.limit))
    .select('description duration date')
    .exec(function(err, exercises) {
      if(err) return next(err);

      const userExercises = {
        _id: user._id,
        username: user.username,
        count: exercises.length,
        log: exercises.map(function(e) {
          e = e.toObject();
          e.date = e.date.toDateString();
          return e;
        })
      };
      res.json(userExercises);
    });
  });
});


router.get('/all', function(req, res, next) {
  Exercise.find({}, function (err, exercises){
    if(err) return next(err);
    res.json(exercises);
  });
});// end GET /all exercises for testing



module.exports = router;
