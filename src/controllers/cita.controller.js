const { getAllCitas, getCitaById, createCita, updateCita, deleteCita } = require("../repositories/cita.repository");

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

exports.createCita = async (req, res) => {
    try {
        console.log(req.body);
        const cita = req.body;

        //Verificar que no pase de los 2 meses la cita
        const fecha = new Date()
        const limite = new Date()
        limite.setMonth(limite.getMonth()+2)

        const fechaCita = new Date(cita.fecha)
        if (fechaCita>limite) {
            return res.status(400).json({msg: 'La fecha de la cita no puede ser superior a 2 meses'})
        }
        //Verificar que la fecha enviada ya no haya pasado
        if (fechaCita<fecha) {
            return res.status(400).json({msg: 'La fecha de la cita ya pasó, intenta de nuevo'})
        }
        //Verificar que sea programada con el tiempo de anticipación requerido
        const fechaMinima = new Date(fecha);
        fechaMinima.setDate(fecha.getDate() + 2);
        if (fechaCita < fechaMinima) {
            return res.status(400).json({ msg: 'La fecha de la cita debe ser programada mínimo con 2 días de anticipación' });
        }
        //Verificar que la hora de la cita no intervenga con otras citas
        const citas = await getAllCitas(); 
        const minima = new Date(fechaCita);
        minima.setHours(minima.getHours() - 2);
        const maxima = new Date(fechaCita);
        maxima.setHours(maxima.getHours() + 2);

        const conflicto = citas.some(citaExistente => {
            const fechaExistente = new Date(citaExistente.fecha);
            return fechaExistente > minima && fechaExistente < maxima;
        });

        if (conflicto) {
            return res.status(400).json({ msg: 'Conflicto con otra cita en un rango de 2 horas' });
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
        
        await createCita(cita);
        res.status(201).json({ msg: 'Cita creada exitosamente', hora });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateCita = async (req, res) => {
    const { id } = req.params;

    try {
        const cita = req.body;
        await updateCita(id, cita);
        res.status(201).json({msg: 'cita actualizada exitosamente'});
    } catch (error) {
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