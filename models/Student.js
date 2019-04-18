module.exports = (sequelize, DataTypes) => {
    return sequelize.define("student",
        {
            "email": {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            "password": {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            "firstname": {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            "lastname": {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            "phone": {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            "address": {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            "pin": {
                type: DataTypes.STRING(13),
                allowNull: false
            },
            "series": {
                type: DataTypes.STRING(2),
                allowNull: false
            },
            "number": {
                type: DataTypes.STRING(6),
                allowNull: false
            },
            "photo": {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "#"
            },
            "active": {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            "enrolled": {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            "credits": {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            "order_number": {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            "study_form": {
                type: DataTypes.STRING,
                defaultValue: "#"
            }
        });
}