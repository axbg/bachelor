module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user",
        {
            "email": {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            "password": {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            "notification_token": {
                type: DataTypes.STRING(100),
                allowNull: true
            }
        });
}