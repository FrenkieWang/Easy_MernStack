const router = require('express').Router();
let Session = require('../models/sessionModel');
const mongoose = require('mongoose');

const generateRandomSession = require('./faker/fakerSession'); 

/* Populate 'therapist' and 'clients', the fields of them
will contain firstName, lastName and _id (default) */
router.route('/').get((req, res) => {
    Session.find()
    .populate('therapist', 'firstName surName')  
    .populate('clients', 'firstName surName')  
    .then(sessions => res.json(sessions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/generate-session').get((req, res) => {
  const session = generateRandomSession(); 
  res.json(session);
  console.log(session)
});


router.route('/add').post((req, res) => {
  // Convert String to ObjectId 
  const clientsObjectId = req.body.clients.map(clientId => mongoose.Types.ObjectId(clientId));
  const therapistObjectId = mongoose.Types.ObjectId(req.body.therapist);

  const newSession = new Session({
      sessionDate: Date.parse(req.body.sessionDate),
      sessionTime: req.body.sessionTime,
      clients: clientsObjectId, // Array of ObjectId
      therapist: therapistObjectId, // ObjectId
      fee: Number(req.body.fee),
      sessionNumber: Number(req.body.sessionNumber),
      sessionAttendance: req.body.sessionAttendance,
      sessionType: req.body.sessionType,
      sessionTypeOther: req.body.sessionType === 'Other' ? req.body.sessionTypeOther : '',
      sessionNotes: req.body.sessionNotes
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
      // Convert String to ObjectId 
      const clientsObjectId = req.body.clients.map(clientId => mongoose.Types.ObjectId(clientId));
      const therapistObjectId = mongoose.Types.ObjectId(req.body.therapist);

      // Update all fields
      session.sessionDate = Date.parse(req.body.sessionDate);
      session.sessionTime = req.body.sessionTime;
      session.clients = clientsObjectId; // Array of ObjectId
      session.therapist = therapistObjectId; // ObjectId
      session.fee = Number(req.body.fee);
      session.sessionNumber = Number(req.body.sessionNumber);
      session.sessionAttendance = req.body.sessionAttendance;
      session.sessionType = req.body.sessionType;
      session.sessionTypeOther = req.body.sessionType === 'Other' ? req.body.sessionTypeOther : '';
      session.sessionNotes = req.body.sessionNotes;

      session.save()
        .then(() => res.json('Session updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;