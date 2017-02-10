/**
 * Created by malet on 09-Feb-17.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('registration', { title: 'Express' });
});

module.exports = router;
