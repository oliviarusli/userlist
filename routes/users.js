var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {
    title: 'Add New User',
    originalData: new res.locals.userModel(),
    action: 'add',
  });
});

router.post('/add', function(req, res, next) {
  let user = req.body;
  new res.locals.userModel({
    userName: user.userName,
    accountNumber: user.accountNumber,
    emailAddress: user.emailAddress,
    identityNumber: user.identityNumber,
  }).save(function(err) {
    if (err) console.log('error', err);
    else {
      res.locals.userModel.find({}, function(err, users) {
        res.locals.client.set('userList', JSON.stringify(users));
        res.render('index', { title: 'User List', userList: users });
      });
    }
    // saved!
  });
});

router.post('/update', function(req, res, next) {
  let user = req.body;
  res.locals.userModel.findById(user._id, function(err, originalData) {
    if (!!originalData) {
      originalData.userName = user.userName;
      originalData.accountNumber = user.accountNumber;
      originalData.emailAddress = user.emailAddress;
      originalData.identityNumber = user.identityNumber;
      originalData.save(function(err) {
        if (err) console.log('error', err);
        else {
          res.locals.userModel.find({}, function(err, users) {
            res.locals.client.set('userList', JSON.stringify(users));
            res.render('index', { title: 'User List', userList: users });
          });
        }
        // saved!
      });
    }
  });
});

module.exports = router;
