var express = require('express');
var router = express.Router();

/* GET todo listing. */
router.get('/', async function(req, res, next) {
  res.render('todo-home');
});

/*
router.get('')

module.exports = router;
