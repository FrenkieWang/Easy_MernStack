const { faker } = require('@faker-js/faker');

function generateRandomSession() {
  const sessionAttendances = ['Attended', 'Cancelled', 'No Show'];
  const sessionAttendance = sessionAttendances[Math.floor(Math.random() * sessionAttendances.length)];

  const sessionTypes = ['Intake', 'Psychotherapy', 'Assessment', 'Other'];
  const sessionType = sessionTypes[Math.floor(Math.random() * sessionTypes.length)];

  const randomSessionTime = 
  `${faker.datatype.number({ min: 0, max: 23 })}:` + 
  `${faker.datatype.number({ min: 0, max: 59 }).toString().padStart(2, '0')}`;

  const session = {
    sessionDate: faker.date.future(),
    sessionTime: randomSessionTime,
    clients: [], 
    therapist: '', 
    fee: faker.finance.amount(0, 10000, 2), 
    sessionNumber: faker.datatype.number({ min: 1, max: 9999 }),
    sessionAttendance: sessionAttendance,
    sessionType: sessionType,
    sessionTypeOther: sessionType === 'Other' ? faker.lorem.word() : undefined,
    sessionNotes: faker.lorem.paragraph()
  };

  return session;
}

module.exports = generateRandomSession;