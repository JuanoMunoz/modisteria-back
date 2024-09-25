const { getAllCotizaciones, getCotizacionById, createCotizacion, updateCotizacion, deleteCotizacion } = require("../repositories/cotizacion.repository");
const { helperImg, uploadToCloudinary, getPublicIdFromUrl, deleteFromCloudinary } = require("../utils/image");

exports.getAllCotizaciones = async (req, res) => {
    try {
        const cotizaciones = await getAllCotizaciones();
        res.status(200).json(cotizaciones);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.getCotizacionById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const cotizacion = await getCotizacionById(id);
        res.status(200).json(cotizacion);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createCotizacion = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { nombrePersona, pedidoId } = req.body;
        const processedBuffer = await helperImg(req.file.buffer, 300);
        const result = await uploadToCloudinary(processedBuffer);

        const newCotizacion = {
            nombrePersona,
            pedidoId,
            imagen: result.url
        };

        const cotizacionCreada = await createCotizacion(newCotizacion);
        res.status(201).json({ msg: 'Cotizacion creado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateCotizacion = async (req, res) => {
    const { id } = req.params;
    const { nombrePersona, pedidoId } = req.body;
    try {
        const existingCotizacion = await getCotizacionById(id);
        const updatedCotizacion = {
            nombrePersona: nombrePersona || existingCotizacion.nombrePersona,
            pedidoId: pedidoId || existingCotizacion.pedidoId,
            imagen: existingCotizacion.imagen
        };

        if (req.file) {
            const processedBuffer = await helperImg(req.file.buffer, 300);
            const result = await uploadToCloudinary(processedBuffer);
            updatedCotizacion.imagen = result.url;  

            if (existingCotizacion.imagen) {
                const publicId = getPublicIdFromUrl(existingCotizacion.imagen); 
                await deleteFromCloudinary(publicId);  
            }
        }

        const updateResult = await updateCotizacion(id, updatedCotizacion);
        res.status(201).json({ msg: 'Cotizacion actualizado exitosamente' });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusCotizacion = async (req, res) => {
    const { id } = req.params;

    try {
        await statusCotizacion(id);
        res.status(201).json({ msg: 'Cotizacion inactivo' });
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteCotizacion = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteCotizacion(id);
        res.status(201).json({ msg: 'Cotizacion eliminado' });
    } catch (error) {
        res.status(500).json(error);
    }
}