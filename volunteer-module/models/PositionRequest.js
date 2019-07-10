module.exports = (sequelize, DataTypes) => {
    return sequelize.define("position_request", {
        "solved": {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}