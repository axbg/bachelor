const bcrypt = require('bcrypt');

const hashStudentPassword = (user, options) => {
  if (user.changed('password')) {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.setDataValue('password', hashedPassword);
  }
};

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('student',
      {
        'email': {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        'password': {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        'firstname': {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        'lastname': {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        'parentInitial': {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
        'phone': {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        'address': {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        'cnp': {
          type: DataTypes.STRING(13),
          allowNull: false,
        },
        'city': {
          type: DataTypes.STRING,
          allowNull: false,
        },
        'series': {
          type: DataTypes.STRING(2),
          allowNull: false,
        },
        'number': {
          type: DataTypes.STRING(6),
          allowNull: false,
        },
        'idPublisher': {
          type: DataTypes.STRING,
          allowNull: false,
        },
        'photo': {
          type: DataTypes.TEXT,
        },
        'active': {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        'enrolled': {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        'tax': {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        'withdrawPortfolio': {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        'credits': {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        'orderNumber': {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        'temporaryFacultyId': {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        'notificationToken': {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        hooks: {
          beforeCreate: hashStudentPassword,
          beforeUpdate: hashStudentPassword,
        },
      },
  );
};
