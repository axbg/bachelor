const database = require('./config');
const Student = database.import('./Student');
const Document = database.import('./Document');

Student.hasMany(Document, { as: 'documents' });

module.exports = {
  database,
  Student,
  Document,
};
