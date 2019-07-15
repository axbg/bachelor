module.exports = (sequelize, DataTypes) => {
    return sequelize.define("document", {
        "title": {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        "file": {
            type: DataTypes.TEXT,
            allowNull: false
        },
        "iteration": {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        "state": {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}