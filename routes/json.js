var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
  res.render('json-form');
});

router.post('/submit', async (req, res) => {
  try {
    let info = JSON.parse(req.body.info);

    res.render('json-response', {
      firstName: info.firstName,
      lastName: info.lastName,
      favFoods: info.favoriteFoods,
      age: info.age,
      favImage: info.picture
    });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;