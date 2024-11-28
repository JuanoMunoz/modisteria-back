const { getAllCompras, getCompraById, createCompra } = require("../repositories/compras.repository");
const { Insumo } = require("../models")
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
        console.log(id);
        const compra = await getCompraById(id);
        res.status(200).json(compra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createCompra = async (req, res) => {
    const { fecha, cantidad, valorTotal, insumoId, proveedorId } = req.body;

    try {
        console.log(req.body);
        const insumo = await Insumo.findByPk(insumoId);
        if (!insumo) {
            throw new Error("El insumo con el ID proporcionado no existe.");
        }
        insumo.cantidad += cantidad;
        await insumo.save();
        const compra = await createCompra({ fecha, cantidad, valorTotal, insumoId, proveedorId });
        res.status(201).json({ msg: "Compra registrada exitosamente", compra });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};
