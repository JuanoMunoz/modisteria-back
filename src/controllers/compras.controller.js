const {
  getAllCompras,
  getCompraById,
  createCompra,
} = require("../repositories/compras.repository");
const { Insumo, Compra } = require("../models");
exports.getAllCompras = async (req, res) => {
  try {
    const compras = await getAllCompras();
    res.status(200).json(compras);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getCompraById = async (req, res) => {
  const { id } = req.params;

  try {
    const compra = await getCompraById(id);
    res.status(200).json(compra);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createCompra = async (req, res) => {
  const { compras } = req.body;
  try {
    if (!Array.isArray(compras) || compras.length === 0) {
      res.status(400).json({ msg: `"Se debe proporcionar al menos una compra."` });

    }
    const comprasRegistradas = [];
    for (const compraData of compras) {
      const { cantidad, valorTotal, insumoId, proveedorId } = compraData;

      const insumo = await Insumo.findByPk(insumoId);
      if (!insumo) {
        res.status(400).json({ msg: `El insumo con el ID ${insumoId} no existe.` });
      }

      insumo.cantidad += cantidad;
      await insumo.save();

      const compra = await createCompra({
        cantidad,
        valorTotal,
        insumoId,
        proveedorId,
        fecha: new Date(),
      });

      comprasRegistradas.push(compra);
    }

    res.status(201).json({
      msg: "Compras registradas exitosamente",
      compras: comprasRegistradas,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

