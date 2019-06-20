module.exports = (sequelize, DataTypes) => {
    return sequelize.define("configuration", {
        "tag": {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        "value": {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    })
}