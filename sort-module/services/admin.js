const generateError = require('../utils/FlowError').generateError;
const Student = require('../models/index').Student;
const Criteria = require('../models/index').Criteria;
const Faculty = require('../models/index').Faculty;
const User = require('../models/index').User;
const StudentOption = require('../models/index').StudentOption;
const FacultyProfile = require('../models/index').FacultyProfile;
const Document = require('../models/index').Document;
const sendMail = require('../utils/moduleAdapter').sendMail;
const sendMultipleAttachmentsMail = require('../utils/moduleAdapter').sendMultipleAttachmentsMail;
const sortLib = require('fast-sort');
const groupArray = require('group-array');
const pdfMake = require('pdfmake/build/pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');
const fs = require('fs');
pdfMake.vfs = vfsFonts.pdfMake.vfs;

const getCriteriaByType = (criterias, type) => {
    const criteria = criterias.find(criteria => criteria.type === type);
    return criteria.value;
}

const addMainScore = (students) => {
    students.map(student => {
        student.setDataValue("mainScore",
            0.6 * getCriteriaByType(student.criterias, "BAC_AVERAGE")
            + 0.1 * (getCriteriaByType(student.criterias, "AVERAGE_9") +
                getCriteriaByType(student.criterias, "AVERAGE_10") +
                getCriteriaByType(student.criterias, "AVERAGE_11") +
                getCriteriaByType(student.criterias, "AVERAGE_12")
            )
        )
    });
}

const addSecondScore = (students) => {
    students.map(student => {
        student.setDataValue("secondScore", getCriteriaByType(student.criterias, "BAC_RO"));
    });
}

const getFacultyProfileById = (profiles, id) => {
    return profiles.find(profile => profile.id === id);
}

const sendMailToStudent = (details, email, profile, authorization) => {
    if (profile) {
        const message = "Felicitari " + details.student + "!\nAi fost admis la " + details.profile
            + " - ";
        const type = details.type === "B" ? "Buget" : "Taxa";
        sendMail(authorization, "Rezultate Admitere ASE 2019", message + type, email);
    } else {
        const message = "Momentan te afli pe lista de asteptare."
        sendMail(authorization, "Rezultate Admitere ASE 2019", message, email)
    }
}

const sendMaillWithDocuments = async (authorization, userId, email) => {
    sendMultipleAttachmentsMail(authorization, "Admitere - Rezultate", "Rezultate admitere", email, userId);
}

const buildDocumentDefinition = (facultyName, isDry, results) => {

    let complexContent = [];
    let tableContent = [];
    tableContent.push(['Nr. crt', 'Student', 'Medie admitere', 'Medie departajare', 'Tip']);

    Object.keys(results).map((key, index) => {
        complexContent.push({ text: key, style: 'lineSpacing' });
        results[key].map((entry, ind) => {
            tableContent.push([ind + 1, entry.student, entry.mainScore, entry.secondScore, entry.type]);
        })
    })

    const documentDefintion = {
        styles: {
            'lineSpacing': {
                margin: [0, 20, 0, 0],
                alignment: 'center'
            }
        },
        content: [
            { text: facultyName, style: 'header', alignment: 'center' },
            {
                text: isDry ? "Repartizare executata in regim de testare" : "Repartizare executata in regim oficial",
                style: 'subheader', alignment: 'center'
            },
            ...complexContent,
            {
                table: {
                    body: tableContent,
                    widths: ['20%', '20%', '20%', '20%', '20%']
                }
            }
        ]
    };

    return documentDefintion;
}

const buildDocument = (facultyName, results, userId, isLastOne, isDry, authorization, email) => {
    const namingConvention = isDry ? facultyName + "_DRY_RESULTS.pdf" : facultyName + "_RESULTS.pdf";
    const documentDefinition = buildDocumentDefinition(facultyName, isDry, results);

    pdfMake.createPdf(documentDefinition).getBase64(async (result) => {
        fs.writeFileSync(namingConvention, Buffer.from(result, 'base64'));
        await Document.create({
            title: namingConvention,
            file: result,
            userId: userId
        });

        if (isLastOne) {
            sendMaillWithDocuments(authorization, userId, email);
        }
    });
}

const sort = async (isDry, userId, authorization, email) => {

    email || generateError("Email is not present", 400);

    const students = await Student.findAll({
        where: {
            enrolled: true
        },
        attributes: ['id', 'firstname', 'lastname', 'email'],
        include: [{ model: Criteria, as: 'criterias' },
        { model: StudentOption, as: 'options' }]
    });

    const profiles = await FacultyProfile.findAll({ include: [{ model: Faculty }] });

    addMainScore(students);
    addSecondScore(students);

    sortLib(students).desc([
        s => s.dataValues.mainScore,
        s => s.dataValues.secondScore
    ]);

    let results = new Map();
    for (let index = 0; index < students.length; index++) {
        let admitted = false;
        for (let optionsIndex = 0; optionsIndex < students[index].options.length; optionsIndex++) {
            const profile = getFacultyProfileById(profiles, students[index].options[optionsIndex].facultyProfileId);
            if (profile.busyPositions < profile.availablePositions) {
                profile.busyPositions++;
                students[index].options[optionsIndex].admitted = true;

                let facultyArray = results.get(profile.faculty.name);

                if (!facultyArray) {
                    facultyArray = []
                }

                const studentResult = {
                    student: students[index].lastname + " " + students[index].firstname,
                    profile: profile.name, type: profile.type,
                    mainScore: students[index].dataValues.mainScore, secondScore: students[index].dataValues.secondScore
                };

                facultyArray.push(studentResult);

                results.set(profile.faculty.name, facultyArray);

                if (!isDry) {
                    sendMailToStudent(studentResult, students[index].email, profile, authorization);
                }

                admitted = true;
                break;
            }
        }

        if (!admitted && !isDry) {
            //need to create lists with the ones that were not accepted
            sendMailToStudent(studentResult, students[index].email, null, authorization);
        }
    }

    const mapKeys = Array.from(results.keys());
    for (let index = 0; index < mapKeys.length; index++) {
        const groupedByProfile = groupArray(results.get(mapKeys[index]), 'profile');
        const isLastOne = index === mapKeys.length - 1;
        buildDocument(mapKeys[index], groupedByProfile, userId, isLastOne, isDry, authorization, email);
    }

    if (!isDry) {
        students.forEach(student => {
            student.options.forEach(option => {
                if (option.changed('admitted')) {
                    option.save();
                }
            })
        });

        profiles.forEach(profile => {
            profile.save();
        });
    }
}

module.exports = {
    sort
}