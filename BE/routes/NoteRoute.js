const express = require("express");
const noteController = require("../repositories/repository.notes");
const router = express.Router();

//STARTS WITH /divisi

router.get("", noteController.getNotes);

module.exports = router;