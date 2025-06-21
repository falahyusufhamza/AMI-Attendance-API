const {DataTypes} = require("sequelize");

const sequelize = require("../database");
const User = require("./User");

const Class = sequelize.define("Class", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Class.belongsTo(User, {
    foreignKey: "id",
});
User.hasMany(Class, {
    foreignKey: "userId",
    as: "classes",
});


module.exports = Class;
