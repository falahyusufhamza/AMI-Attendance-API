const Attendance = require("../database/models/Attendance");
const Class = require("../database/models/Class");
const ClassAttendanceStatus = require("../database/models/ClassAttendanceStatus");
const User = require("../database/models/User");

exports.getPendingAttendanceTasks = (req, res, next) => {
    ClassAttendanceStatus.findAll({
     include: [{
            model: Class,
            attributes: ['id', 'name'],
            where: { userId: req.query.userId },
            required: true
        }],
        where: { status: "Pending" }
    }).then(data => {
        return res.status(200).json({
            success: true,
            data,
        })
    }).catch(error => {
        console.log('Error fetching pending attendance tasks: ' + error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    });
}

exports.markAttendance = (req, res, next) => {
    const { classAttendanceId, attendance, date, classId } = req.body;
    Attendance.bulkCreate(attendance.map(item => {
        return {
            studentId: item.id,
            classAttendanceStatusId: classAttendanceId,
            status: item.status,
            remarks: item.remarks,
        }
    })).then(() => {
        ClassAttendanceStatus.update({
        status: "Completed",
    }, {
        where: {id: classAttendanceId},
    }).then(() => {
        return res.status(200).json({
            success: true,
            message: "Attendance marked successfully",
        })
    }).catch(error => {
            console.log('Error marking class attendance status: ' + error.message);
            return res.status(500).json({
                success: false,
                message: "Something went wrong while marking class attendance status",
            });
        });
    }).catch(error => {
        console.log('Error marking student-wise attendance: ' + error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while marking student-wise attendance",
        });
    });

    
}