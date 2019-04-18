const database = require('./config');
const Student = database.import("./Student");
const StudentOption = database.import("./StudentOption");
const Faculty = database.import("./Faculty");
const Document = database.import("./Document");

Student.hasMany(StudentOption, { as: "Options" });
Student.hasMany(Document, { as: "Documents" });
Student.belongsTo(Faculty);

StudentOption.belongsTo(Faculty);

module.exports = {
    database,
    Student,
    StudentOption,
    Faculty,
    Document
}