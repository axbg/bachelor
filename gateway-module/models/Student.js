module.exports = (sequelize, DataTypes) => {
    return sequelize.define("student",
        {
            "email": {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            "password": {
                type: DataTypes.STRING(255),
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
            "parentInitial": {
                type: DataTypes.STRING(2),
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
            "cnp": {
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
            "idPublisher": {
                type: DataTypes.STRING,
                allowNull: false
            },
            "photo": {
                type: DataTypes.BLOB
            },
            "active": {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            "tax": {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            "withdrawPortfolio": {
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
            "notificationToken": {
                type: DataTypes.STRING(100),
                allowNull: true
            },
        });
}