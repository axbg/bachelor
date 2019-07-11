module.exports = (sequelize, DataTypes) => {
    return sequelize.define("role", {
        "role": {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    })
}