const router = require('express').Router();
let Session = require('../models/sessionModel');

router.route('/').get((req, res) => {
    Session.find()
    .then(sessions => res.json(sessions))
    .catch(err => res.status(400).json('Error: ' + err));
});

// 添加新客户
router.route('/add').post((req, res) => {
    const newSession = new Session({
        sessionDate: Date.parse(req.body.sessionDate),
        sessionTime: req.body.sessionTime,
        clients: req.body.clients, // 需要确保是 ObjectId 数组
        therapist: req.body.therapist, // 需要是 ObjectId
        fee: Number(req.body.fee),
        sessionNumber: Number(req.body.sessionNumber),
        sessionAttendance: req.body.sessionAttendance,
        sessionType: req.body.sessionType,
        sessionTypeOther: req.body.sessionType === 'Other' ? req.body.sessionTypeOther : '',
        sessionNotes: req.body.sessionNotes,
        genderPreference: req.body.genderPreference
    });
  
    newSession.save()
      .then(() => res.json('Session added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req, res) => {
  Session.findById(req.params.id)
    .then(session => res.json(session))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Session.findByIdAndDelete(req.params.id)
    .then(() => res.json('Session deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Session.findById(req.params.id)
    .then(session => {
      // 更新所有字段
      session.sessionDate = Date.parse(req.body.sessionDate);
      session.sessionTime = req.body.sessionTime;
      session.clients = req.body.clients;
      session.therapist = req.body.therapist;
      session.fee = Number(req.body.fee);
      session.sessionNumber = Number(req.body.sessionNumber);
      session.sessionAttendance = req.body.sessionAttendance;
      session.sessionType = req.body.sessionType;
      session.sessionTypeOther = req.body.sessionType === 'Other' ? req.body.sessionTypeOther : '';
      session.sessionNotes = req.body.sessionNotes;
      session.genderPreference = req.body.genderPreference;

      session.save()
        .then(() => res.json('Session updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;