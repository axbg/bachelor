module.exports = (sequelize, DataTypes) => {
    return sequelize.define("position", {
        "position": {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    })
}