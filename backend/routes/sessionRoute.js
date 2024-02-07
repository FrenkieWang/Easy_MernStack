const router = require('express').Router();
let Session = require('../models/sessionModel');
const mongoose = require('mongoose');

const generateRandomSession = require('./faker/fakerSession'); 

router.route('/').get((req, res) => {
    Session.find()
    .populate('therapist', 'firstName surName')  // 假设 Therapist 模型有 firstName 和 lastName 字段 _id 默认包含
    .populate('clients', 'firstName surName')  // 假设 Client 模型有 firstName 和 lastName 字段 _id 默认包含
    .then(sessions => res.json(sessions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/generate-session').get((req, res) => {
  const session = generateRandomSession(); 
  res.json(session);
  console.log(session)
});

// 添加新客户
router.route('/add').post((req, res) => {

  // 将 clients 数组中的每个字符串 ID 转换为 ObjectId
  const clientsObjectId = req.body.clients.map(clientId => mongoose.Types.ObjectId(clientId));
  // 将 therapist 字符串 ID 转换为 ObjectId
  const therapistObjectId = mongoose.Types.ObjectId(req.body.therapist);

  const newSession = new Session({
      sessionDate: Date.parse(req.body.sessionDate),
      sessionTime: req.body.sessionTime,
      clients: clientsObjectId, // 需要确保是 ObjectId 数组
      therapist: therapistObjectId, // 需要是 ObjectId
      fee: Number(req.body.fee),
      sessionNumber: Number(req.body.sessionNumber),
      sessionAttendance: req.body.sessionAttendance,
      sessionType: req.body.sessionType,
      sessionTypeOther: req.body.sessionType === 'Other' ? req.body.sessionTypeOther : '',
      sessionNotes: req.body.sessionNotes
      // genderPreference: req.body.genderPreference
  });

  newSession.save()
    .then(() => res.json('Session added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Session.findById(req.params.id)
    .populate('therapist', 'firstName surName') 
    .populate('clients', 'firstName surName')  
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
      // 将 clients 数组中的每个字符串 ID 转换为 ObjectId
      const clientsObjectId = req.body.clients.map(clientId => mongoose.Types.ObjectId(clientId));
      // 将 therapist 字符串 ID 转换为 ObjectId
      const therapistObjectId = mongoose.Types.ObjectId(req.body.therapist);

      // 更新所有字段
      session.sessionDate = Date.parse(req.body.sessionDate);
      session.sessionTime = req.body.sessionTime;
      session.clients = clientsObjectId;
      session.therapist = therapistObjectId;
      session.fee = Number(req.body.fee);
      session.sessionNumber = Number(req.body.sessionNumber);
      session.sessionAttendance = req.body.sessionAttendance;
      session.sessionType = req.body.sessionType;
      session.sessionTypeOther = req.body.sessionType === 'Other' ? req.body.sessionTypeOther : '';
      session.sessionNotes = req.body.sessionNotes;
      // session.genderPreference = req.body.genderPreference;

      session.save()
        .then(() => res.json('Session updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;