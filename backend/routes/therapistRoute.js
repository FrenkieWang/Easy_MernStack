const router = require('express').Router();
let Therapist = require('../models/therapistModel');

router.route('/').get((req, res) => {
    Therapist.find()
    .then(therapists => res.json(therapists))
    .catch(err => res.status(400).json('Error: ' + err));
});

// 添加新客户
router.route('/add').post((req, res) => {
    const newTherapist = new Therapist({
      title: req.body.title,
      titleOther: req.body.titleOther,
      firstName: req.body.firstName,
      surName: req.body.surName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      homeAddress: req.body.homeAddress
    });
  
    newTherapist.save()
      .then(() => res.json('Therapist added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req, res) => {
  Therapist.findById(req.params.id)
    .then(therapist => res.json(therapist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Therapist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Therapist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Therapist.findById(req.params.id)
    .then(therapist => {
      // 更新所有字段
      therapist.title = req.body.title;
      therapist.titleOther = req.body.title === 'Other' ? req.body.titleOther : '';
      therapist.firstName = req.body.firstName;
      therapist.surName = req.body.surName;
      therapist.phoneNumber = req.body.phoneNumber;
      therapist.email = req.body.email;

      // 更新地址信息
      therapist.homeAddress.addressLine1 = req.body.homeAddress.addressLine1;
      therapist.homeAddress.addressLine2 = req.body.homeAddress.addressLine2;
      therapist.homeAddress.town = req.body.homeAddress.town;
      therapist.homeAddress.countyCity = req.body.homeAddress.countyCity;
      therapist.homeAddress.eircode = req.body.homeAddress.eircode;

      therapist.save()
        .then(() => res.json('Therapist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;