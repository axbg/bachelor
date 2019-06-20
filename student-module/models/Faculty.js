module.exports = (sequelize, DataTypes) => {
    return sequelize.define("faculty", {
        "name": {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        "budget": {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        "tax": {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}