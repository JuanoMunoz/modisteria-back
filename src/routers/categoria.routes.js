const { Router } = require("express");
const {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  statusCategoria,
  getCategoriaByTipo,
} = require("../controllers/categoria.controller");
const { verifyToken } = require("../utils/verifyToken");
const { buscarPermiso } = require("../validators/validations.validator");
const router = Router();

router.get("/getAllCategorias", getAllCategorias);

router.get(
  "/getCategoriaById/:id",
  [verifyToken, buscarPermiso("CATEGORIA")],
  getCategoriaById
);

router.get(
  "/getCategoriaByTipo/:tipo",
  [verifyToken, buscarPermiso("CATEGORIA")],
  getCategoriaByTipo
);

router.post(
  "/createCategoria",
  [verifyToken, buscarPermiso("CATEGORIA")],
  createCategoria
);

router.put(
  "/updateCategoria/:id",
  [verifyToken, buscarPermiso("CATEGORIA")],
  updateCategoria
);

router.put(
  "/statusCategoria/:id",
  [verifyToken, buscarPermiso("CATEGORIA")],
  statusCategoria
);

router.delete(
  "/deleteCategoria/:id",
  [verifyToken, buscarPermiso("CATEGORIA")],
  deleteCategoria
);

module.exports = router;
