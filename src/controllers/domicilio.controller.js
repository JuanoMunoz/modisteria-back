const {
  getAllDomicilios,
  getDomicilioById,
  getDomiciliosByDomiciliario,
  getDomiciliosByCliente,
  createDomicilio,
  updateDomicilio,
  deleteDomicilio,
  getDomiciliosByClienteId,
} = require("../repositories/domicilio.repository");

exports.getAllDomicilios = async (req, res) => {
  try {
    const domicilios = await getAllDomicilios();
    res.status(200).json(domicilios);
  } catch (error) {
    console.log("Error al obtener los domicilios", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getDomicilioById = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(id);
    const domicilio = await getDomicilioById(id);
    res.status(200).json(domicilio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDomiciliosByDomiciliario = async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const domicilios = await getDomiciliosByDomiciliario(usuarioId);

    if (domicilios.length === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontraron domicilios de este domiciliario." });
    }
    res.status(200).json(domicilios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los domicilios." });
  }
};

exports.getDomiciliosByClienteId = async (req, res) => {
  const { id } = req.params;

  try {
    const domicilios = await getDomiciliosByClienteId(id);

    if (domicilios.length === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontraron domicilios para este cliente." });
    }

    res.status(200).json(domicilios);
  } catch (error) {
    console.error("Error al obtener los domicilios por cliente:", error);
    res.status(500).json({ msg: "Error al obtener los domicilios." });
  }
};

exports.createDomicilio = async (req, res) => {
  const domicilio = req.body;

  try {
    const newDomicilio = {
      novedades: null,
      ventaId: 0,
      valorPrendas: 0,
      valorFinal: 0,
      metodoPago,
      estadoId: 3,
    };
    const venta = await createVenta(newVenta);
    console.log("Venta creada:", venta);
    console.log(req.body);
    await createDomicilio(domicilio);
    res.status(201).json({ msg: "Domicilio creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateDomicilio = async (req, res) => {
  const { id } = req.params;
  const domicilio = req.body;

  try {
    await updateDomicilio(id, domicilio);
    res.status(201).json({ msg: "Domicilio actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.statusDomicilio = async (req, res) => {
  const { id } = req.params;

  try {
    await statusDomicilio(id);
    res.status(201).json({ msg: "domicilio inactivo" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteDomicilio = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteDomicilio(id);
    res.status(201).json({ msg: "domicilio eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
