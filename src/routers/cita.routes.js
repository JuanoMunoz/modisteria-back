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
  aceptarCita,
  cancelarCita
} = require("../controllers/cita.controller");
const { verifyToken } = require("../utils/verifyToken");
const { buscarPermiso } = require("../validators/validations.validator");
const { upload } = require("../utils/image.js");

const router = Router();

router.get("/getAllCitas", [verifyToken, buscarPermiso("Citas")], getAllCitas);

router.get(
  "/getCitaById/:id",
  [verifyToken, buscarPermiso("Citas")],
  getCitaById
);
router.get(
  "/getCitaByUserId/:usuarioId",
  [verifyToken, buscarPermiso("Citas")],
  getCitasByUsuarioId
);

router.post(
  "/createCita",
  [verifyToken, buscarPermiso("Citas"), upload.single("file")],
  createCita
);

router.put("/updateSPT/:id", updateSPT);

router.put("/aceptarCita/:id", aceptarCita);
router.put("/cancelarCita/:id", cancelarCita)

router.put(
  "/updateCita/:id",
  [verifyToken, buscarPermiso("Citas"), upload.single("file")],
  updateCita
);

router.put(
  "/statusCita/:id",
  [verifyToken, buscarPermiso("Citas")],
  statusCita
);

router.delete(
  "/deleteCita/:id",
  [verifyToken, buscarPermiso("Citas")],
  deleteCita
);

module.exports = router;
