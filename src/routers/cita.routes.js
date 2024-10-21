const { Router } = require("express");
const {getAllCitas,getCitaById,createCita,updateCita,deleteCita,statusCita,updateSPT,getCitasByUsuarioId,} = require("../controllers/cita.controller");
const { verifyToken } = require("../utils/verifyToken");
const { buscarPermiso } = require("../validators/validations.validator");
const { upload } = require("../utils/image.js");

const router = Router();

router.get("/getAllCitas", [verifyToken, buscarPermiso('CITAS')], getAllCitas);

router.get("/getCitaById/:id",[verifyToken, buscarPermiso('CITAS')],getCitaById);
router.get("/getCitaByUserId/:usuarioId", [verifyToken, buscarPermiso('CITAS')], getCitasByUsuarioId);

router.post("/createCita",[verifyToken, buscarPermiso('CITAS'), upload.single("file")], createCita);

router.put("/updateSPT/:id",[verifyToken, buscarPermiso('CITAS')], updateSPT);

router.put("/updateCita/:id",[verifyToken, buscarPermiso('CITAS'), upload.single("file")], updateCita);

router.put("/statusCita/:id",[verifyToken, buscarPermiso('CITAS')],statusCita);

router.delete("/deleteCita/:id",[verifyToken, buscarPermiso('CITAS')],deleteCita
);

module.exports = router;
