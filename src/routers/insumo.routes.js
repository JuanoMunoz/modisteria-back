const { Router } = require("express");
const { getAllInsumos, getInsumoById, createInsumo, updateInsumo, deleteInsumo, statusInsumo, getInsumosByCategoria} = require("../controllers/insumo.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRolPermisoInsumo } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllInsumos', [verifyToken, validateRolPermisoInsumo], getAllInsumos);

router.get('/getInsumoById/:id', [verifyToken, validateRolPermisoInsumo], getInsumoById);

router.get('/getInsumoByCategoria/:categoriaId', [verifyToken, validateRolPermisoInsumo], getInsumosByCategoria);

router.post('/createInsumo', [verifyToken, validateRolPermisoInsumo], createInsumo);

router.put('/updateInsumo/:id', [verifyToken, validateRolPermisoInsumo], updateInsumo);

router.put('/statusInsumo/:id', [verifyToken, validateRolPermisoInsumo], statusInsumo);

router.delete('/deleteInsumo/:id', [verifyToken, validateRolPermisoInsumo], deleteInsumo);

module.exports = router;