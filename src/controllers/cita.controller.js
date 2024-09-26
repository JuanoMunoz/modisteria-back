const { getAllCitas, getCitaById, createCita, updateCita, deleteCita } = require("../repositories/cita.repository");
const { helperImg, uploadToCloudinary, getPublicIdFromUrl, deleteFromCloudinary } = require("../utils/image");

exports.getAllCitas = async (req, res) => {
  try {
    const citas = await getAllCitas();
    res.status(200).json(citas);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getCitaById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const cita = await getCitaById(id);
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getCitasByUsuarioId = async (req, res) => {
    const { usuarioId } = req.params;
    try {
        const citas = await getCitasByUsuarioId(usuarioId);
        res.status(200).json(citas);
    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({ msg: 'Error al obtener citas', error });
    }
};

exports.createCita = async (req, res) => {
    try {
        console.log(req.body);
        const { fecha, objetivo, usuarioId } = req.body;

        // Verificar que no pase de los 2 meses la cita
        const fechaActual = new Date();
        const limite = new Date();
        limite.setMonth(limite.getMonth() + 2);

        const fechaCita = new Date(fecha);
        if (fechaCita > limite) {
            return res.status(400).json({ msg: 'La fecha de la cita no puede ser superior a 2 meses' });
        }
        // Verificar que la fecha enviada ya no haya pasado
        if (fechaCita < fechaActual) {
            return res.status(400).json({ msg: 'La fecha de la cita ya pasó, intenta de nuevo' });
        }
        // Verificar que sea programada con el tiempo de anticipación requerido
        const fechaMinima = new Date(fechaActual);
        fechaMinima.setDate(fechaActual.getDate() + 3);
        if (fechaCita < fechaMinima) {
            return res.status(400).json({ msg: 'La fecha de la cita debe ser programada mínimo con 3 días de anticipación' });
        }

        // Lunes a viernes
        const dia_semana = fechaCita.getDay();
        if (dia_semana === 0 || dia_semana === 6) {
            return res.status(400).json({ msg: 'Solo se atiende de lunes a viernes' });
        }

        // Horario de atención
        const hora = fechaCita.getHours() + 5;
        if (hora < 8 || hora > 17) {
            return res.status(400).json({ msg: 'Solo se atiende de 8 a.m a 5 p.m', hora });
        }

        // Manejar el archivo de imagen si se envía, si no, establecer referencia en null
        let referencia = null;
        if (req.file) {
            const processedBuffer = await helperImg(req.file.buffer, 300);
            const result = await uploadToCloudinary(processedBuffer);
            referencia = result.url;
        }

        const newCita = {
            fecha,
            objetivo,
            usuarioId,
            estadoId: 9,
            referencia // Guardar null o el enlace de la imagen
        };

        await createCita(newCita);
        res.status(201).json({ msg: 'Cita creada exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


//actualizar estado, precio y estado
exports.updateSPT = async(req,res)=>{
    try {
        const {id} = req.params
        const {estadoId, tiempo, precio} = req.body
        const existingCita = await getCitaById(id);
        if (!existingCita) {
            res.status(500).json({msg:"Cita no encontrada, intente de nuevo."})
        }
        const updatedCita = { 
            estadoId: estadoId || existingCita.estadoId,
            tiempo,
            precio
        }
        /* const mailOptions = {
            from: "modistadonaluz@gmail.com",
            to: email,
            subject: 'Código de verificación',
            html: ``
        } */
        await updateCita(id, updatedCita)
        res.status(201).json({msg:'Estado, precio y tiempo de cita actualizado exitosamente'})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
exports.updateCita = async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const { fecha, objetivo,usuarioId} = req.body;
    try {
        //Verificar que no pase de los 2 meses la cita
        const fechaActual = new Date()
        const limite = new Date()
        limite.setMonth(limite.getMonth()+2)

        const fechaCita = new Date(fecha)
        if (fechaCita>limite) {
            return res.status(400).json({msg: 'La fecha de la cita no puede ser superior a 2 meses'})
        }
        //Verificar que la fecha enviada ya no haya pasado
        if (fechaCita<fechaActual) {
            return res.status(400).json({msg: 'La fecha de la cita ya pasó, intenta de nuevo'})
        }
        //Verificar que sea programada con el tiempo de anticipación requerido
        const fechaMinima = new Date(fechaActual);
        fechaMinima.setDate(fechaActual.getDate() + 2);
        if (fechaCita < fechaMinima) {
            return res.status(400).json({ msg: 'La fecha de la cita debe ser programada mínimo con 2 días de anticipación' });
        }
        //Lunes a viernes
        const dia_semana = fechaCita.getDay();
        if (dia_semana ==0 || dia_semana==6) {
            return res.status(400).json({ msg: 'Solo se atiende de lunes a viernes' });
        }
        //Horario de atención
        const hora = fechaCita.getHours()+5;
        if (hora < 8 || hora > 17) {
            return res.status(400).json({ msg: 'Solo se atiende de 8 a.m a 5 p.m',hora });
        }
        
        //Modificar imagen
        const existingCita = await getCitaById(id);

        const updatedCita = { 
            fecha: fecha || existingCita.fecha,
            objetivo: objetivo || existingCita.objetivo,
            usuarioId: usuarioId || existingCita.usuarioId,
            referencia: existingCita.referencia
        }

        if (req.file) {
            const processedBuffer = await helperImg(req.file.buffer, 300);
            const result = await uploadToCloudinary(processedBuffer);
            updatedCita.referencia = result.url;  

            if (existingCita.imagen) {
                const publicId = getPublicIdFromUrl(existingCita.referencia); 
                await deleteFromCloudinary(publicId);  
            }
        }else{
            updatedCita.referencia = null
        }
        await updateCita(id, updatedCita);
        res.status(201).json({ msg: 'Cita actualizada exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.statusCita = async (req, res) => {
    const { id } = req.params;
    try {
        await statusCita(id);
        res.status(201).json({msg: 'cita inactiva'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteCita = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCita(id);
        res.status(201).json({msg: 'cita eliminada'});
    } catch (error) {
        res.status(500).json(error);
    }
}