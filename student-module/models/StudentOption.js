module.exports = (sequelize, DataTypes) => {
    return sequelize.define("student_option", {
        "study_form": {
            type: DataTypes.STRING(1),
            allowNull: false
        }
    })
}