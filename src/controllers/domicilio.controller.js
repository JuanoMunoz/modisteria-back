const { getAllDomicilios, getDomicilioById, getDomiciliosByDomiciliario, getDomiciliosByCliente, createDomicilio, updateDomicilio, deleteDomicilio } = require("../repositories/domicilio.repository");

exports.getAllDomicilios = async (req, res) => {
    try {
        const domicilios = await getAllDomicilios();
        res.status(200).json(domicilios);
    } catch (error) {
        console.log("Error al obtener los domicilios", error);
        res.status(500).json(error);
    }
};

exports.getDomicilioById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const domicilio = await getDomicilioById(id);
        res.status(200).json(domicilio);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getDomiciliosByDomiciliario = async (req, res) => {
    const { usuarioId } = req.params;
    try {
        if (usuarioId == req.userId) {
            const domicilios = await getDomiciliosByDomiciliario(usuarioId);

            if (domicilios.length === 0) {
                return res.status(404).json({ msg: 'No se encontraron domicilios de este domiciliario.' });
            }
            res.status(200).json(domicilios);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los domicilios.' });
    }
};

exports.getDomiciliosByCliente = async (req, res) => {
    const { clienteId } = req.params;

    try {
        const domicilios = await getDomiciliosByCliente(clienteId);

        if (domicilios.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron domicilios para este cliente.' });
        }

        res.status(200).json(domicilios);
    } catch (error) {
        console.error('Error al obtener los domicilios por cliente:', error);
        res.status(500).json({ msg: 'Error al obtener los domicilios.' });
    }
};

//Modificar el create para que el usuarioId que se use se req.userId del token 
exports.createDomicilio = async (req, res) => {
    const domicilio = req.body;

    try {
        console.log(req.body);
        await createDomicilio(domicilio);
        res.status(201).json({ msg: 'Domicilio creado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateDomicilio = async (req, res) => {
    const { id } = req.params;
    const domicilio = req.body;

    try {
        await updateDomicilio(id, domicilio);
        res.status(201).json({ msg: 'domicilio actualizado exitosamente' });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusDomicilio = async (req, res) => {
    const { id } = req.params;

    try {
        await statusDomicilio(id);
        res.status(201).json({ msg: 'domicilio inactivo' });
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteDomicilio = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteDomicilio(id);
        res.status(201).json({ msg: 'domicilio eliminado' });
    } catch (error) {
        res.status(500).json(error);
    }
}