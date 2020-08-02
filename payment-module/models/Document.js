module.exports = (sequelize, DataTypes) => {
  return sequelize.define('document', {
    'title': {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    'file': {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  });
};
