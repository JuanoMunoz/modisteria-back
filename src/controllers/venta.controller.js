const { getAllVentas, getVentaById, createVenta } = require("../repositories/venta.repository");

exports.getAllVentas = async (req, res) => {
  try {
    const ventas = await getAllVentas();
    res.status(200).json(ventas);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getVentaById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const venta = await getVentaById(id);
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createVenta = async (req, res) => {
    const venta = req.body;

    try {
        console.log(req.body);
        await createVenta(venta);
        res.status(201).json({msg: 'venta creada exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};