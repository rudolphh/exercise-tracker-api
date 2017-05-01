
const User = require('./models/user');
const Exercise = require('./models/exercise');

const express = require('express');
const router = express.Router();


router.post('/new-user', function (req, res) {
  res.send(req.body.username);
});




module.exports = router;
