const express = require("express");
const adminController = require("../repositories/repository.admin");
const userController = require("../repositories/repository.user");
const router = express.Router();

//STARTS WITH /admin

//login
router.post("/login", adminController.adminLogin);
//grant
router.put("/grant", adminController.adminGrant);
//postRequest
router.post("/request", userController.request_post);
//getRequest
router.get("/request", adminController.adminRequest);
//approve
router.post("/approve", adminController.adminApprove);

module.exports = router;