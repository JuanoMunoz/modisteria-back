// const router = require("express").Router();
const { Router } = require("express");
const { getAllPQRS, getPQRSById, createPQRS, updatePQRS, deletePQRS, statusPQRS} = require("../controllers/pqrs.controller");
const router = Router();

router.get('/getAllPQRS', getAllPQRS);

router.get('/getPQRSById/:id', getPQRSById);

router.post('/createPQRS', createPQRS);

router.put('/updatePQRS/:id', updatePQRS);

router.put('/statusPQRS/:id', statusPQRS);

router.delete('/deletePQRS/:id', deletePQRS);

module.exports = router;