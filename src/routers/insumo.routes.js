// const router = require("express").Router();
const { Router } = require("express");
const { getAllInsumos, getInsumoById, createInsumo, updateInsumo, deleteInsumo, statusInsumo, getInsumosByCategoria} = require("../controllers/insumo.controller");
const router = Router();

router.get('/getAllInsumos', [], getAllInsumos);

router.get('/getInsumoById/:id', [], getInsumoById);

router.get('/getInsumoByCategoria/:categoriaId', [], getInsumosByCategoria);

router.post('/createInsumo', createInsumo);

router.put('/updateInsumo/:id', [], updateInsumo);

router.put('/statusInsumo/:id', [], statusInsumo);

router.delete('/deleteInsumo/:id', [], deleteInsumo);

module.exports = router;