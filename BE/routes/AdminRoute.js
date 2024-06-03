const express = require("express");
const adminController = require("../repositories/repository.admin");
const router = express.Router();

//STARTS WITH /admin

//login
router.post("/login", adminController.adminLogin);
//grant
router.put("/grant", adminController.adminGrant);
//getRequest
router.get("/request", adminController.adminGetRequest);
//approve
router.put("/approve", adminController.adminApprove);
//users
router.get("/users", adminController.adminGetUsers);

module.exports = router;