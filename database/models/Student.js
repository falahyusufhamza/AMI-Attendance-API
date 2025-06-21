const {DataTypes} = require("sequelize");

const sequelize = require("../database");
const Class = require("./Class");

const Student = sequelize.define("Student", {
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
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Student.belongsTo(Class, {foreignKey: "id"});
Class.hasMany(Student, {
    foreignKey: "classId",
});

module.exports = Student;
