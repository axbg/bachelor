module.exports = (sequelize, DataTypes) => {
    return sequelize.define("faculty_profile", {
        "name": {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        "type": {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        "availablePositions": {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        "busyPositions": {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}