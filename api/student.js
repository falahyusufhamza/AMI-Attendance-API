const express = require("express");
const studentController = require("../controllers/student");
const router = express.Router();

router.post("/api/student", studentController.createStudent);
// router.put("/api/student", usersController.signIn)
router.get("/api/class-students", studentController.getClassStudents)

module.exports = router;