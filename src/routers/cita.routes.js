const { Router } = require("express");
const {
  getAllCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita,
  statusCita,
  updateSPT,
  getCitasByUsuarioId,
} = require("../controllers/cita.controller");
const { verifyToken } = require("../utils/verifyToken");
const {
  validateRolPermisoCita,
} = require("../validators/validations.validator");
const { upload } = require("../utils/image.js");

const router = Router();

router.get("/getAllCitas", [verifyToken], getAllCitas);

router.get(
  "/getCitaById/:id",
  [verifyToken, validateRolPermisoCita],
  getCitaById
);
router.get("/getCitaByUserId/:usuarioId", [verifyToken], getCitasByUsuarioId);

router.post(
  "/createCita",
  [verifyToken, validateRolPermisoCita, upload.single("file")],
  createCita
);

router.put("/updateSPT/:id", [verifyToken, validateRolPermisoCita], updateSPT);

router.put(
  "/updateCita/:id",
  [verifyToken, validateRolPermisoCita, upload.single("file")],
  updateCita
);

router.put(
  "/statusCita/:id",
  [verifyToken, validateRolPermisoCita],
  statusCita
);

router.delete(
  "/deleteCita/:id",
  [verifyToken, validateRolPermisoCita],
  deleteCita
);

module.exports = router;
