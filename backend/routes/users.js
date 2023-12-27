const router = require('express').Router();
let User = require('../models/userModel');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;

  const newUser = new User({
    fname,
    lname
  });

  console.log(newUser);

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;