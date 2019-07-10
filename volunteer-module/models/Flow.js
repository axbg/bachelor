module.exports = (sequelize, DataTypes) => {
    return sequelize.define("flow", {
        "flow": {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        "time": {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    })
}