module.exports = (sequelize, DataTypes) => {
    return sequelize.define("student_option", {
        "admitted": {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}