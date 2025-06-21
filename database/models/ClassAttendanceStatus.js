const {DataTypes} = require("sequelize");

const sequelize = require("../database");
const Class = require("./Class");
const Attendance = require("./Attendance");

const ClassAttendanceStatus = sequelize.define("ClassAttendanceStatus", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Class,
            key: "id",
        },
    },
    status: {
        type: DataTypes.ENUM("Pending", "Completed"),
        allowNull: false,
    },
});

ClassAttendanceStatus.belongsTo(Class, {
    foreignKey: "classId",
});



module.exports = ClassAttendanceStatus;
