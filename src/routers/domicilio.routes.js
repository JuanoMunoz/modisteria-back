const { Router } = require("express");
const {
  getAllDomicilios,
  getDomicilioById,
  getDomiciliosByDomiciliario,
  getDomiciliosByClienteId,
  createDomicilio,
  updateDomicilio,
  deleteDomicilio,
  statusDomicilio,
} = require("../controllers/domicilio.controller");
const { verifyToken } = require("../utils/verifyToken");
const { buscarPermiso } = require("../validators/validations.validator");
const router = Router();

router.get("/getAllDomicilios", getAllDomicilios);

router.get(
  "/getDomicilioById/:id",
  [verifyToken, buscarPermiso("Domicilios")],
  getDomicilioById
);

router.get(
  "/getDomiciliosByDomiciliario/:usuarioId",
  [verifyToken, buscarPermiso("Domicilios")],
  getDomiciliosByDomiciliario
);

router.get(
  "/getDomiciliosByClienteId/:id",
  [verifyToken, buscarPermiso("Domicilios")],
  getDomiciliosByClienteId
);

router.post(
  "/createDomicilio",
  [verifyToken, buscarPermiso("Domicilios")],
  createDomicilio
);

router.put(
  "/updateDomicilio/:id",
  [verifyToken, buscarPermiso("Domicilios")],
  updateDomicilio
);

router.put(
  "/statusDomicilio/:id",
  [verifyToken, buscarPermiso("Domicilios")],
  statusDomicilio
);

router.delete(
  "/deleteDomicilio/:id",
  [verifyToken, buscarPermiso("Domicilios")],
  deleteDomicilio
);

module.exports = router;
