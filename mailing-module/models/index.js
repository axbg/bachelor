const database = require('./config');
const Document = database.import("./Document");
const Faculty = database.import('./Faculty');
const User = database.import('./User');

Document.belongsTo(User);

module.exports = {
    database,
    Document,
    Faculty
}