const router = require('express').Router();
let Client = require('../models/clientModel');

const generateRandomClient = require('./faker/fakerClient'); 

router.route('/').get((req, res) => {
    Client.find()
    .then(clients => res.json(clients))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/generate-client').get((req, res) => {
  const client = generateRandomClient(); 
  res.json(client);
  console.log(client)
});

// 添加新客户
router.route('/add').post((req, res) => {
    const newClient = new Client({
      title: req.body.title,
      titleOther: req.body.titleOther,
      firstName: req.body.firstName,
      surName: req.body.surName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      homeAddress: req.body.homeAddress,
      dateOfBirth: Date.parse(req.body.dateOfBirth),
      parentGuardianName: req.body.parentGuardianName,
      permissionToLeaveMessage: req.body.permissionToLeaveMessage,
      gender: req.body.gender,
      maritalStatus: req.body.maritalStatus,
      referrer: req.body.referrer
      // recordCreationDate 会自动设置
    });
  
    newClient.save()
      .then(() => res.json('Client added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req, res) => {
  Client.findById(req.params.id)
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then(() => res.json('Client deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Client.findById(req.params.id)
    .then(client => {
      // 更新所有字段
      client.title = req.body.title;
      client.titleOther = req.body.title === 'Other' ? req.body.titleOther : '';
      client.firstName = req.body.firstName;
      client.surName = req.body.surName;
      client.phoneNumber = req.body.phoneNumber;
      client.email = req.body.email;

      // 更新地址信息
      client.homeAddress.addressLine1 = req.body.homeAddress.addressLine1;
      client.homeAddress.addressLine2 = req.body.homeAddress.addressLine2;
      client.homeAddress.town = req.body.homeAddress.town;
      client.homeAddress.countyCity = req.body.homeAddress.countyCity;
      client.homeAddress.eircode = req.body.homeAddress.eircode;

      // 更新额外个人信息
      client.dateOfBirth = Date.parse(req.body.dateOfBirth);
      client.parentGuardianName = new Date(req.body.dateOfBirth).getFullYear() > new Date().getFullYear() - 18 ? req.body.parentGuardianName : '';
      client.permissionToLeaveMessage = req.body.permissionToLeaveMessage;
      client.gender = req.body.gender;
      client.maritalStatus = req.body.maritalStatus;
      client.referrer = req.body.referrer;

      client.save()
        .then(() => res.json('Client updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;