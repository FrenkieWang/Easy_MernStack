const { faker } = require('@faker-js/faker');

function generateRandomTherapist() {
  const titles = ['Mx', 'Ms', 'Mr', 'Mrs', 'Miss', 'Dr', 'Other'];
  const title = titles[Math.floor(Math.random() * titles.length)];

  const therapist = {
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
    }
  };

  return therapist;
}

module.exports = generateRandomTherapist;