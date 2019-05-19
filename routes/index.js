'use strict';

var express = require('express');
var app = express();
var router = express.Router();
// var redis = require('redis');
// const client = redis.createClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.client.get('userList', function(err, result) {
    if (!result) {
      res.locals.userModel.find({}, function(err, users) {
        res.locals.client.set('userList', JSON.stringify(users));
        res.render('index', { title: 'User List', userList: users });
      });
    }
    res.render('index', { title: 'User List', userList: JSON.parse(result) });
  });
});

router.get('/delete/:userId', function(req, res, next) {
  let param = req.params.userId;

  res.locals.userModel.deleteOne({ _id: param }, function(err) {
    if (err) return handleError(err);
    res.locals.userModel.find({}, function(err, users) {
      if (err) return handleError(err);
      res.locals.client.set('userList', JSON.stringify(users));
      res.render('index', { title: 'User List', userList: users });
    });
  });
});

router.get('/update/:userId', function(req, res, next) {
  var userId = req.params.userId;
  res.locals.client.get(userId, function(err, result) {
    if (!result) {
      res.locals.userModel.findById(userId, function(err, user) {
        res.locals.client.set(userId, JSON.stringify(user));
        res.render('users', { title: 'Update User Data', originalData: user, action: 'update' });
      });
    }
    res.render('users', {
      title: 'Update User Data',
      originalData: JSON.parse(result),
      action: 'update',
    });
  });
});

module.exports = router;
