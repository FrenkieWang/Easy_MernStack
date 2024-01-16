const router = require('express').Router();
let User = require('../models/userModel');

const bcrypt = require("bcryptjs");

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const { fname, lname, email, password} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fname,
    lname,
    email,
    password : encryptedPassword
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;