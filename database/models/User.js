const {DataTypes} = require("sequelize");

const sequelize = require("../database");

const User = sequelize.define("user", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    whatsappNo: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM(["ADMIN","STANDARD"]),
    }
});

module.exports = User;
