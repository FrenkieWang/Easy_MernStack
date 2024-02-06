var faker = require('faker');

var database = { quotations: [] };

for (var i = 0; i < 100; i++) {
  database.quotations.push({
    id: i,
    quotation:  faker.lorem.sentence(),
    author:     faker.name.findName(),
  });
}

console.log(JSON.stringify(database, null, "  "));