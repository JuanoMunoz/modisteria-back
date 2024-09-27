const {
  getAllCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita,
  getCitaByUAS,
  getCitasByUserId,
  getCitasAceptadas,
} = require("../repositories/cita.repository");
const {
  helperImg,
  uploadToCloudinary,
  getPublicIdFromUrl,
  deleteFromCloudinary,
} = require("../utils/image");
const transporter = require("../utils/mailer");

const { getEmailByUserId } = require("../repositories/usuario.repository");
const moment = require("moment");
const { format } = require("morgan");

exports.getAllCitas = async (req, res) => {
  try {
    const citas = await getAllCitas(req.query.estadoId);
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
  const estadoId = req.query.estadoId || false;
  try {
    const citas = await getCitasByUserId(usuarioId, estadoId);
    res.status(200).json(citas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener citas", error });
  }
};

exports.createCita = async (req, res) => {
  try {
    console.log(req.body);
    const { fecha, objetivo, usuarioId } = req.body;
    const citaActiva = await getCitaByUAS(usuarioId);
    if (citaActiva) {
      return res.status(400).json({
        msg: "No puedes crear una nueva cita hasta que la cita anterior haya sido terminada/cancelada.",
      });
    }
    const fechaActual = new Date();
    const limite = new Date();
    limite.setMonth(limite.getMonth() + 2);

    const fechaCita = new Date(fecha);
    if (fechaCita > limite) {
      return res
        .status(400)
        .json({ msg: "La fecha de la cita no puede ser superior a 2 meses" });
    }
    if (fechaCita < fechaActual) {
      return res
        .status(400)
        .json({ msg: "La fecha de la cita ya pasó, intenta de nuevo" });
    }
    const fechaMinima = new Date(fechaActual);
    fechaMinima.setDate(fechaActual.getDate() + 3);
    if (fechaCita < fechaMinima) {
      return res.status(400).json({
        msg: "La fecha de la cita debe ser programada mínimo con 3 días de anticipación",
      });
    }
    const dia_semana = fechaCita.getDay();
    if (dia_semana === 0 || dia_semana === 6) {
      return res
        .status(400)
        .json({ msg: "Solo se atiende de lunes a viernes" });
    }
    const hora = fechaCita.getHours();
    if (hora < 8 || hora > 17) {
      return res
        .status(400)
        .json({ msg: "Solo se atiende de 8 a.m a 5 p.m", hora });
    }
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
      referencia,
    };
    await createCita(newCita);
    res.status(201).json({ msg: "Cita creada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.updateSPT = async (req, res) => {
  try {
    const { id } = req.params;
    const { estadoId, tiempo, precio } = req.body;

    const existingCita = await getCitaById(id);
    if (!existingCita) {
      return res
        .status(500)
        .json({ msg: "Cita no encontrada, intente de nuevo." });
    }
    const usuarioId = existingCita.usuarioId;
    const email = await getEmailByUserId(usuarioId);
    const mailOptions = {
      from: "modistadonaluz@gmail.com",
      to: email,
      subject: "¡Cita aprobada por la modista!",
      html: `<!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Correo Electrónico</title>
                <style>
                    .all {
                        background-color: #252525;
                        text-align: center;
                        justify-content: center;
                        margin: 0 auto;
                        min-width: 400px;
                        max-width: 500px;
                        min-height: 500px;
                        padding: 10px;
                        border-radius: 8px;
                    }
                    .container {
                        background-image: url('https://i.pinimg.com/564x/55/ac/eb/55aceb377ec84ed5487aa685a527d187.jpg');
                        margin: 0 auto;
                        min-width: 400px;
                        max-width: 500px;
                        min-height: 500px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    .header {
                        background-color: rgb(39, 38, 38);
                        color: black;
                        padding: 20px;
                        border-radius: 8px 8px 0 0;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 30px;
                    }
                    .content {
                        padding: 20px;
                    }
                    .content p {
                        font-size: 18px;
                        color: black;
                        line-height: 1.5;
                        margin: 20px 0;
                    }
                    .verification-code {
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 2px;
                        color: black;
                        background-color: white;
                        padding: 10px 20px;
                        border-bottom: solid 5px black;
                        display: inline-block;
                        margin: 20px 0;
                    }
                    .btn {
                        display: inline-block;
                        padding: 12px 25px;
                        font-size: 16px;
                        color: white;
                        background-color: #4CAF50;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 20px;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="all">
                    <div class="container">
                        <div class="content">
                            <h1>Modisteria D.L</h1>
                            <hr>
                            <p>¡Felicitaciones! Tu cita ha sido <strong>aprobada</strong> por la modista.</p>
                            <p>Nos complace informarte que tu cita ha sido aprobada, ya puedes ver el precio de esta y decidir si aún la quieres agendar o no.</p>
                            <p>Si tienes alguna duda o necesitas hacer ajustes, por favor, contáctanos.</p>
                        </div>
                        <div class="footer">
                            <p>Si no has solicitado esta cita, ignora este correo.</p>
                            <p>&copy; 2024 Modisteria D.L. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `,
    };
    console.log(email);
    await transporter.sendMail(mailOptions);

    const updatedCita = {
      estadoId: estadoId || existingCita.estadoId,
      tiempo,
      precio,
    };
    await updateCita(id, updatedCita);
    res.status(201).json({
      msg: "Estado, precio, tiempo y fecha de finalización de cita actualizado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.updateCita = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { fecha, objetivo, usuarioId } = req.body;
  try {
    //Verificar que no pase de los 2 meses la cita
    const fechaActual = new Date();
    const limite = new Date();
    limite.setMonth(limite.getMonth() + 2);

    const fechaCita = new Date(fecha);
    if (fechaCita > limite) {
      return res
        .status(400)
        .json({ msg: "La fecha de la cita no puede ser superior a 2 meses" });
    }
    //Verificar que la fecha enviada ya no haya pasado
    if (fechaCita < fechaActual) {
      return res
        .status(400)
        .json({ msg: "La fecha de la cita ya pasó, intenta de nuevo" });
    }
    //Verificar que sea programada con el tiempo de anticipación requerido
    const fechaMinima = new Date(fechaActual);
    fechaMinima.setDate(fechaActual.getDate() + 2);
    if (fechaCita < fechaMinima) {
      return res.status(400).json({
        msg: "La fecha de la cita debe ser programada mínimo con 2 días de anticipación",
      });
    }
    //Lunes a viernes
    const dia_semana = fechaCita.getDay();
    if (dia_semana == 0 || dia_semana == 6) {
      return res
        .status(400)
        .json({ msg: "Solo se atiende de lunes a viernes" });
    }
    //Horario de atención
    const hora = fechaCita.getHours() + 5;
    if (hora < 8 || hora > 17) {
      return res
        .status(400)
        .json({ msg: "Solo se atiende de 8 a.m a 5 p.m", hora });
    }

    //Modificar imagen
    const existingCita = await getCitaById(id);

    const updatedCita = {
      fecha: fecha || existingCita.fecha,
      objetivo: objetivo || existingCita.objetivo,
      usuarioId: usuarioId || existingCita.usuarioId,
      referencia: existingCita.referencia,
    };

    if (req.file) {
      const processedBuffer = await helperImg(req.file.buffer, 300);
      const result = await uploadToCloudinary(processedBuffer);
      updatedCita.referencia = result.url;

      if (existingCita.imagen) {
        const publicId = getPublicIdFromUrl(existingCita.referencia);
        await deleteFromCloudinary(publicId);
      }
    } else {
      updatedCita.referencia = null;
    }
    await updateCita(id, updatedCita);
    res.status(201).json({ msg: "Cita actualizada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.statusCita = async (req, res) => {
  const { id } = req.params;
  try {
    await statusCita(id);
    res.status(201).json({ msg: "cita inactiva" });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deleteCita = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCita(id);
    res.status(201).json({ msg: "Cita eliminada" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
