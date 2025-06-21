const express = require('express');

const attendanceController = require('../controllers/attendance');
const router = express.Router();

router.get('/api/get-pending-attendance-tasks', attendanceController.getPendingAttendanceTasks);
router.post('/api/mark-attendance', attendanceController.markAttendance);

module.exports = router;