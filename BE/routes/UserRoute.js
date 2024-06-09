const express = require("express");
const userController = require("../repositories/repository.user");
const router = express.Router();

//STARTS WITH /user

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/request", userController.request_post);
router.post("/logout", userController.logout);
router.get("/request", userController.request_get);
router.get("", userController.getUserById);

module.exports = router;
