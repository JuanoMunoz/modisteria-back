const { Router } = require("express");
const { getAllInsumos, getInsumoById, createInsumo, updateInsumo, deleteInsumo, statusInsumo, getInsumosByCategoria, reponerInsumo} = require("../controllers/insumo.controller");
const { verifyToken } = require("../utils/verifyToken");
const { buscarPermiso } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllInsumos', [verifyToken, buscarPermiso('INSUMO')], getAllInsumos);

router.get('/getInsumoById/:id', [verifyToken, buscarPermiso('INSUMO')], getInsumoById);

router.get('/getInsumoByCategoria/:categoriaId', [verifyToken, buscarPermiso('INSUMO')], getInsumosByCategoria);

router.put('/reponerInsumo',[verifyToken, buscarPermiso('INSUMO')], reponerInsumo);

router.post('/createInsumo', [verifyToken, buscarPermiso('INSUMO')], createInsumo);

router.put('/updateInsumo/:id', [verifyToken, buscarPermiso('INSUMO')], updateInsumo);

router.put('/statusInsumo/:id', [verifyToken, buscarPermiso('INSUMO')], statusInsumo);

router.delete('/deleteInsumo/:id', [verifyToken, buscarPermiso('INSUMO')], deleteInsumo);

module.exports = router;