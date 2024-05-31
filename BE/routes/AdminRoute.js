const express = require("express");
const adminController = require("../repositories/repository.admin");
const router = express.Router();

//STARTS WITH /admin

//login
router.post("/login", adminController.adminLogin);
//grant
router.put("/grant", adminController.adminGrant);
//request
router.post("/request", adminController.adminRequest);
//approve
router.post("/approve", adminController.adminApprove);

module.exports = router;