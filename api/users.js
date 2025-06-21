const express = require("express");
const usersController = require("../controllers/users");
const router = express.Router();

router.post("/create-user", usersController.createUser);
router.post("/signin", usersController.signIn)
router.post("/api/signout", usersController.signout)

module.exports = router;