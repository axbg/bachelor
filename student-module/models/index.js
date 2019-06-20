const database = require('./config');
const Student = database.import("./Student");
const StudentOption = database.import("./StudentOption");
const Faculty = database.import("./Faculty");
const Document = database.import("./Document");
const Criteria = database.import("./Criteria");
const Configuration = database.import("./Configuration");

Student.hasMany(StudentOption, { as: "Options" });
Student.hasMany(Document, { as: "Documents" });
Student.belongsTo(Faculty);
Student.hasMany(Criteria, { as: "Criteria" });

StudentOption.belongsTo(Faculty);

module.exports = {
    database,
    Student,
    StudentOption,
    Faculty,
    Document,
    Criteria,
    Configuration
}