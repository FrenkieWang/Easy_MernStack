const { faker } = require('@faker-js/faker');

function generateRandomClient() {
  const titles = ['Mx', 'Ms', 'Mr', 'Mrs', 'Miss', 'Dr', 'Other'];
  const title = titles[Math.floor(Math.random() * titles.length)];

  const genders = ['Male', 'Female', 'Prefer not to say'];
  const gender = genders[Math.floor(Math.random() * genders.length)];

  const maritalStatuses = ['Never Married', 'Domestic Partnership', 'Married', 'Separated', 'Divorced', 'Widowed'];
  const maritalStatus = maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)];

  const permissions = ['Y', 'N'];
  const permissionToLeaveMessage = permissions[Math.floor(Math.random() * permissions.length)];

  const dateOfBirth = faker.date.between('1920-01-01', '2010-12-31');
  const isUnder18 = new Date().getFullYear() - dateOfBirth.getFullYear() < 18;

  const client = {
    title: title,
    titleOther: title === 'Other' ? faker.lorem.word() : undefined,
    firstName: faker.name.firstName(),
    surName: faker.name.lastName(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    homeAddress: {
      addressLine1: faker.address.streetAddress(),
      addressLine2: faker.address.secondaryAddress(),
      town: faker.address.city(),
      countyCity: faker.address.county(),
      eircode: faker.address.zipCode()
    },
    dateOfBirth: dateOfBirth,
    parentGuardianName: isUnder18 ? `${faker.name.firstName()} ${faker.name.lastName()}` : undefined,
    permissionToLeaveMessage: permissionToLeaveMessage,
    gender: gender,
    maritalStatus: maritalStatus,
    referrer: faker.company.name(), 
    recordCreationDate: faker.date.recent()
  };

  return client;
}

module.exports = generateRandomClient;