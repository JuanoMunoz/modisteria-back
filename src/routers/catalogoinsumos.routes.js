const { Router } = require("express");
const { ftCatalogo } = require("../controllers/ficha.controller");
const router = Router();

router.get('/getFTCatalogo', ftCatalogo )
// router.get('/getInfo', prueba )

module.exports = router;