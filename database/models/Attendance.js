const {DataTypes} = require("sequelize");

const sequelize = require("../database");
const Student = require("./Student");
const ClassAttendanceStatus = require("./ClassAttendanceStatus");

const Attendance = sequelize.define("Attendance", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    classAttendanceStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("present", "absent", "late","leave"),
        allowNull: false,
    },
});

Attendance.belongsTo(Student, {
    foreignKey: "id",
});
Student.hasMany(Attendance, {
    foreignKey: "studentId",
});
ClassAttendanceStatus.hasMany(Attendance, {
    foreignKey: "classAttendanceStatusId",
    as: "attendances",
});

ClassAttendanceStatus.belongsTo(Attendance, {
    foreignKey: "id"
});
Attendance.hasMany(ClassAttendanceStatus, {
    foreignKey: "id",
});


module.exports = Attendance;
