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
        },
        "coordinates": {
            type: DataTypes.STRING(80),
            allowNull: false,
            defaultValue: "44.4557508#26.0643324"
        },
        "currentOrderNumber": {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })
}