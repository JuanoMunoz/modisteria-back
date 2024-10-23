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
  [verifyToken, buscarPermiso("Categorías")],
  getCategoriaById
);

router.get(
  "/getCategoriaByTipo/:tipo",
  [verifyToken, buscarPermiso("Categorías")],
  getCategoriaByTipo
);

router.post(
  "/createCategoria",
  [verifyToken, buscarPermiso("Categorías")],
  createCategoria
);

router.put(
  "/updateCategoria/:id",
  [verifyToken, buscarPermiso("Categorías")],
  updateCategoria
);

router.put(
  "/statusCategoria/:id",
  [verifyToken, buscarPermiso("Categorías")],
  statusCategoria
);

router.delete(
  "/deleteCategoria/:id",
  [verifyToken, buscarPermiso("Categorías")],
  deleteCategoria
);

module.exports = router;
