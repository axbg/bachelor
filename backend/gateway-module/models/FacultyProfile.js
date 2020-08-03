module.exports = (sequelize, DataTypes) => {
  return sequelize.define('facultyProfile', {
    'name': {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    'type': {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    'available': {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    'busy': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
