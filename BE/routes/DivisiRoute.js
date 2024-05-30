const express = require("express");
const divisiController = require("../repositories/repository.divisi");
const router = express.Router();

//STARTS WITH /divisi

//users
router.get("/users", divisiController.getUsers);
//konten
router.get("/konten", divisiController.getKonten);

module.exports = router;