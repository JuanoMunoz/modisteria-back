const { Router } = require("express");
const {
  getAllVentas,
  getVentaById,
  createVenta,
  getVentaByUsuarioId,
  confirmarVenta,
  cancelarVenta,
  calcularDomicilio,
} = require("../controllers/venta.controller");
const { verifyToken } = require("../utils/verifyToken");
const { upload } = require("../utils/image");
const { buscarPermiso } = require("../validators/validations.validator");
const router = Router();

router.get("/getAllVentas", [verifyToken], getAllVentas);

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
  [upload.single("file")],
  createVenta
);

router.post(
  "/confirmarVenta/:id",
  [verifyToken, buscarPermiso("Ventas")],
  confirmarVenta
);

router.post(
  "/cancelarVenta/:id",
 
  cancelarVenta
);

router.post("/calcularDomicilio/:id", calcularDomicilio)

module.exports = router;
