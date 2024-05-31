const express = require("express");
const adminController = require("../repositories/repository.admin");
const router = express.Router();

//STARTS WITH /admin

//login
router.post("/login", adminController.adminLogin);
//grant
router.put("/grant", adminController.adminGrant);
//postRequest
router.post("/request", adminController.adminPostRequest);
//getRequest
router.get("/request", adminController.adminGetRequest);
//approve
router.post("/approve", adminController.adminApprove);

module.exports = router;