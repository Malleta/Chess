var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var DB = require('../databaseJSON');
var bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
    res.render('registration', { title: 'Express' });
});

module.exports = router;
