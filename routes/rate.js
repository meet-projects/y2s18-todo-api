var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
  res.send('User Rating Server');
});

router.post('/', async (req, res) => {
  try {
    let username = req.body.username;
    let rating = req.body.rating;

    res.send(`Hello, ${username}! You were rated ${username.length} out of 5 stars.`);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;