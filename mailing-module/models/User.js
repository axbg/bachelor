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
        'notification_token': {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      });
};
