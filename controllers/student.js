const Student = require("../database/models/Student");

exports.createStudent = async (req, res, next) => {
    const requestBody = req.body;
    const {name, classId} = requestBody;

    const newStudent = {
        name,
        classId,
    };

    Student.create(newStudent).then(() => {
        return res.json({
            success: true,
            message: "Successfully created a new student"
        })
    }, () => {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    });
}

exports.getClassStudents = (req, res, next) => {
    Student.findAll({
        where: {classId: req.query.classId}
    }).then((students) => {
        return res.status(200).json({
            success: true,
            data: students,
        });
    }).catch(() => {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    });
}