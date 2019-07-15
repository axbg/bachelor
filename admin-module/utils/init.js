const User = require('../models').User;
const Role = require('../models').Role;
const Faculty = require('../models').Faculty;
const FacultyProfile = require('../models').FacultyProfile;
const Position = require('../models').Position;

module.exports.initDb = async () => {
    // await Role.destroy({ truncate: true });
    // await Faculty.destroy({ truncate: true });

    const roles = await Role.findAll({});

    if (roles.length === 0) {
        await Role.bulkCreate([
            { role: "VOLUNTEER" },
            { role: "CASHIER" },
            { role: "OPERATOR" },
            { role: "ADMIN" }
        ]);

        await Faculty.bulkCreate([
            { name: "CSIE", budget: 150, tax: 210 },
            { name: "FABBV", budget: 110, tax: 120 },
            { name: "FABIZ", budget: 35, tax: 50 },
            { name: "EAM", budget: 90, tax: 110 },
            { name: "ETA", budget: 70, tax: 10 },
        ]);

        await User.create({ username: "admin1", password: "password1", roleId: 4, facultyId: 1 });

        await FacultyProfile.bulkCreate([
            { name: "CSIE - Informatica economica", type: "B", availablePositions: 100, busyPositions: 0, facultyId: 1 },
            { name: "CSIE - Informatica economica", type: "T", availablePositions: 210, busyPositions: 0, facultyId: 1 },
            { name: "CSIE - Cibernetica economica", type: "B", availablePositions: 120, busyPositions: 0, facultyId: 1 },
            { name: "CSIE - Cibernetica economica", type: "T", availablePositions: 230, busyPositions: 0, facultyId: 1 },
            { name: "CSIE - Statistica", type: "B", availablePositions: 90, busyPositions: 0, facultyId: 1 },
            { name: "CSIE - Statistica", type: "T", availablePositions: 110, busyPositions: 0, facultyId: 1 },
        ])

        await Position.bulkCreate([
            { position: "EXTERIOR", facultyId: 1 },
            { position: "USA_INTRARE", facultyId: 1 },
            { position: "SCARA E1", facultyId: 1 },
            { position: "SCARA E2", facultyId: 1 },
            { position: "CALCULATOARE", facultyId: 1 },
        ])
    }
}