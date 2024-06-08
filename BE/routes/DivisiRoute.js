const express = require("express");
const divisiController = require("../repositories/repository.divisi");
const router = express.Router();

//STARTS WITH /divisi

//users
router.get("/users", divisiController.getUsers);
//konten
router.get("/konten", divisiController.getKonten);

router.get("/",divisiController.getDivisi);

router.get("/",divisiController.searchKonten);

router.get("/konten",divisiController.getKontenDetails);

module.exports = router;