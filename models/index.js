const database = require('./config');
const Student = database.import("./Student");


module.exports = {
    database,
    Student

}