const bcrypt = require('bcrypt');

const hashUserPassword = (user, options) => {
  if (user.changed('password')) {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.setDataValue('password', hashedPassword);
  }
};

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user',
    {
      'username': {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      'password': {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      'notificationToken': {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate: hashUserPassword,
        beforeUpdate: hashUserPassword,
      },
    });
};
