const { faker } = require('@faker-js/faker');

function generateRandomSession() {
  const sessionAttendanceOptions = ['Attended', 'Cancelled', 'No Show'];
  const sessionAttendanceOption = sessionAttendanceOptions[Math.floor(Math.random() * sessionAttendanceOptions.length)];

  const sessionTypeOptions = ['Intake', 'Psychotherapy', 'Assessment', 'Other'];
  const sessionTypeOption = sessionTypeOptions[Math.floor(Math.random() * sessionTypeOptions.length)];

  const randomSessionTime = 
  `${faker.datatype.number({ min: 0, max: 23 })}:` + 
  `${faker.datatype.number({ min: 0, max: 59 }).toString().padStart(2, '0')}`;
  //  + `${["AM", "PM"][Math.floor(Math.random() * 2)]}`;

  const session = {
    sessionDate: faker.date.future(),
    sessionTime: randomSessionTime,
    // clients: [new mongoose.Types.ObjectId()], // 生成一个示例ObjectId，实际应用中需要替换
    // therapist: new mongoose.Types.ObjectId(), // 同上
    clients: [], 
    therapist: '', 
    fee: faker.commerce.price(50, 200), // 假设费用在50到200之间
    sessionNumber: faker.datatype.number({ min: 1, max: 100 }),
    sessionAttendance: sessionAttendanceOption,
    sessionType: sessionTypeOption,
    sessionTypeOther: undefined, // 仅当sessionType为'Other'时设置
    sessionNotes: faker.lorem.paragraph()
  };

  // 如果会话类型为'Other'，则添加额外的会话类型说明
  if (session.sessionType === 'Other') {
    session.sessionTypeOther = faker.lorem.words(3);
  }

  return session;
}

module.exports = generateRandomSession;
