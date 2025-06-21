const express = require("express");
const classController = require("../controllers/class");
const router = express.Router();

router.get("/api/classes", classController.getClasses);

module.exports = router;