const { Router } = require("express");
const {
  getAllVentas,
  getVentaById,
  createVenta,
  getVentaByUsuarioId,
  confirmarVenta,
} = require("../controllers/venta.controller");
const { verifyToken } = require("../utils/verifyToken");
const { upload } = require("../utils/image");
const { buscarPermiso } = require("../validators/validations.validator");
const router = Router();

router.get(
  "/getAllVentas",
  [verifyToken, buscarPermiso("Ventas")],
  getAllVentas
);

router.get(
  "/getVentaById/:id",
  [verifyToken, buscarPermiso("Ventas")],
  getVentaById
);

router.get(
  "/getVentaByUsuarioId/:id",
  [verifyToken, buscarPermiso("Ventas")],
  getVentaByUsuarioId
);

router.post(
  "/createVenta",
  [verifyToken, buscarPermiso("Ventas"), upload.single("file")],
  createVenta
);

router.post(
  "/confirmarVenta/:id",
  [verifyToken, buscarPermiso("Ventas")],
  confirmarVenta
);

module.exports = router;
