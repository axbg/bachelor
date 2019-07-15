const database = require('./config');
const Student = database.import("./Student");
const StudentOption = database.import("./StudentOption");
const Faculty = database.import("./Faculty");
const Document = database.import("./Document");
const Criteria = database.import("./Criteria");
const Configuration = database.import("./Configuration");
const FacultyProfile = database.import("./FacultyProfile");
const User = database.import('./User');
const Role = database.import('./Role');
const Position = database.import('./Position');
const PositionRequest = database.import('./PositionRequest');
const Flow = database.import('./Flow');

Student.hasMany(StudentOption, { as: "options" });
Student.hasMany(Document, { as: "documents" });
Student.hasMany(Criteria, { as: "criterias" });

StudentOption.belongsTo(FacultyProfile);

FacultyProfile.belongsTo(Faculty);

User.belongsTo(Faculty);
User.belongsTo(Role);
User.belongsTo(Position);

PositionRequest.belongsTo(User);
PositionRequest.belongsTo(Position);

Document.belongsTo(User);

Flow.belongsTo(Faculty);

Position.belongsTo(Faculty);
module.exports = {
    database,
    Student,
    StudentOption,
    Faculty,
    Document,
    Criteria,
    Configuration,
    FacultyProfile,
    User,
    Role,
    Position,
    PositionRequest
}