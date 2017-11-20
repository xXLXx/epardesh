var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//link your test file.
router.get('/test', function(req, res, next) {
    res.render('test', { title: 'Test File' });
});

module.exports = router;
