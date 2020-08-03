const database = require('./config');
const Student = database.import('./Student');
const User = database.import('./User');

module.exports = {
  database,
  Student,
  User,
};
