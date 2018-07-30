var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
  res.render('json');
});

router.post('/', async (req, res) => {
  let username = req.body.username;

  try {
    res.send(`Hello, ${username}! Your name is ${username.length} letters long.`);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;