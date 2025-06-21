const express = require("express");
const authorisationController = require("../controllers/authorisation");
const router = express.Router();

router.use("/api", authorisationController.authorise);

module.exports = router;