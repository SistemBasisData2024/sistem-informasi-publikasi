const express = require("express");
const divisiController = require("../repositories/repository.divisi");
const router = express.Router();

//STARTS WITH /user

//getUsers
router.get("/users", divisiController.getUsers);
//getKonten
router.get("/konten", divisiController.getKonten);

module.exports = router;