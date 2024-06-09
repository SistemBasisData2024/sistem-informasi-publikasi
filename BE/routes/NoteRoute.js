const express = require("express");
const noteController = require("../repositories/repository.notes");
const router = express.Router();

//STARTS WITH /notes

router.post("/get", noteController.getNotes);
router.post("", noteController.addNote);
router.get("/tahap", noteController.getTahap);

module.exports = router;