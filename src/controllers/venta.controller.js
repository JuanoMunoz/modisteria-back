const { Pedido, CatalogoInsumos, Insumo, Cita } = require("../models");
const { createDomicilioVenta } = require("../repositories/domicilio.repository");
const { getPedidoByUsuarioyEstado, getPedidoByVenta, } = require("../repositories/pedido.repository");
const { getAllVentas, getVentaById, createVenta, getVentaByUsuarioId, updateVenta, getUsuarioIdByPedidoId } = require("../repositories/venta.repository");
const { helperImg, uploadToCloudinary, gestionImagen } = require("../utils/image");
const transporter = require("../utils/mailer");
const { getEmailByUserId } = require('../repositories/usuario.repository');
const { getCitaById } = require("../repositories/cita.repository");

exports.getAllVentas = async (req, res) => {
  try {
    const ventas = await getAllVentas();
    res.status(200).json(ventas);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getVentaById = async (req, res) => {
  const { id } = req.params;

  try {
    const venta = await getVentaById(id);
    res.status(200).json(venta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVentaByUsuarioId = async (req, res) => {
  const { id } = req.params;

  try {
    const venta = await getVentaByUsuarioId(id);
    res.status(200).json(venta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createVenta = async (req, res) => {
  const { valorDomicilio, nombrePersona } = req.body;

  try {
    let imagen;
    try {
      imagen = await gestionImagen(req);
    } catch (error) {
      console.error("Error gestionando imagen:", error);
      return res.status(400).json({ msg: "Se requiere una imagen para el método de pago transferencia" });
    }

    if (!nombrePersona) {
      return res.status(400).json({ msg: "Se requiere el nombre de la persona que realiza la tranferencia" });
    }

    const newVenta = {
      fecha: new Date(),
      imagen,
      nombrePersona,
      valorDomicilio: Number(valorDomicilio) || 0,
      valorPrendas: 0,
      valorFinal: 0,
      metodoPago: "transferencia",
      estadoId: 3,
    };

    const venta = await createVenta(newVenta);

    const usuario = req.id;
    const pedidos = await getPedidoByUsuarioyEstado(usuario);

    if (!pedidos || pedidos.length === 0) {
      return res.status(400).json({ msg: "No hay pedidos disponibles para el usuario" });
    }

    let total = 0;

    try {
      const proceso = await Promise.all(
        pedidos.map(async (producto) => {
          try {
            const pedidoActualizado = await Pedido.update(
              { ventaId: venta.id },
              { where: { id: producto.id } }
            );
            total += producto.valorUnitario * producto.cantidad;
            return pedidoActualizado;
          } catch (error) {
            throw new Error("Error actualizando pedidos: " + error.message);
          }
        })
      );
    } catch (error) {
      console.error("Error en el proceso de actualización de pedidos:", error);
      return res.status(500).json({ msg: "Error actualizando los pedidos" });
    }

    const cambio = {
      valorPrendas: total,
      valorDomicilio: Number(valorDomicilio) || 0,
      valorFinal: total + (Number(valorDomicilio) || 0),
    };

    const ventaActualizada = await updateVenta(venta.id, cambio);

    if (valorDomicilio > 0) {
      try {
        const crearDomicilio = await createDomicilioVenta(venta.id);
      } catch (error) {
        console.error("Error creando domicilio:", error);
        return res.status(500).json({ msg: "Error al crear el domicilio" });
      }
    }

    res.status(201).json({ msg: "Venta creada y actualizada exitosamente" });
  } catch (error) {
    console.log("Error en el proceso:", error);
    res.status(500).json({ error: "Error al crear la venta" });
  }
};

exports.confirmarVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await getVentaById(id);
    if (!venta) {
      return res.status(404).json({ msg: "Venta no encontrada" });
    }
    const pedidos = await getPedidoByVenta(id);
    if (pedidos.length === 0) {
      return res
        .status(404)
        .json({ msg: "No hay pedidos asociados a esta venta" });
    }
    const usuarioId = pedidos[0].usuarioId;
    const email = await getEmailByUserId(usuarioId)

    // Verificar insumos
    const catalogoId = pedidos[0].catalogoId;
    const cantidad = pedidos[0].cantidad;

    // Obtener los insumos necesarios para el catálogo
    const insumosCatalogo = await CatalogoInsumos.findAll({
      where: { catalogo_id: catalogoId },
    });

    if (!insumosCatalogo || insumosCatalogo.length === 0) {
      return res
        .status(404)
        .json({ msg: "No hay insumos configurados para este catálogo." });
    }

    // Verificar disponibilidad de insumos
    const insumosInsuficientes = [];

    for (const insumo of insumosCatalogo) {
      const insumoId = insumo.insumo_id;
      const cantidadNecesaria = insumo.cantidad_utilizada * cantidad;

      // Obtener disponibilidad del insumo desde la tabla de inventario
      const inventarioInsumo = await Insumo.findByPk(insumoId);

      if (!inventarioInsumo || inventarioInsumo.cantidad < cantidadNecesaria) {
        insumosInsuficientes.push({
          insumoId,
          requerido: cantidadNecesaria,
          disponible: inventarioInsumo ? inventarioInsumo.cantidad : 0,
        });
      }
    }

    // Si hay insumos insuficientes, detener el flujo
    if (insumosInsuficientes.length > 0) {
      return res.status(400).json({
        msg: "No hay suficientes insumos para confirmar la venta.",
        detalles: insumosInsuficientes,
      });
    }

    // Actualizar el estado de cada pedido
    await Promise.all(
      pedidos.map(async (producto) => {
        await Pedido.update(
          { estadoId: 14 }, // Estado Pagado
          { where: { id: producto.id } }
        );
      })
    );
    // Actualizar el estado de la venta
    const cambio = { estadoId: 14 }; // Estado Pagado
    await updateVenta(id, cambio);
    const mailOptions = {
      from: "modistadonaluz@gmail.com",
      to: email,
      subject: "Venta confirmada",
      html: `<!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Código de recuperación</title>
                <style>
                    body {
                        background-color: #f4f4f4;
                        font-family: Arial, sans-serif;
                        margin: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }

                    .all, .container {
                        max-width: 500px;
                        width: 100%;
                        margin: 0 auto;
                        border-radius: 8px;
                    }

                    .all {
                        background-color: #f4f4f4;
                        padding: 10px;
                    }

                    .container {
                        background-color: #ffffff;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }

                    .header {
                        background-color: #873780;
                        color: white;
                        padding: 20px;
                        border-radius: 8px 8px 0 0;
                    }

                    .header h1 {
                        margin: 0;
                        font-size: 30px;
                    }

                    /* Contenido principal */
                    .content {
                        padding: 20px;
                    }

                    .content p {
                        font-size: 18px;
                        color: #333;
                        line-height: 1.5;
                        margin: 20px 0;
                    }

                    .verification-code {
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 2px;
                        color: #ffffff;
                        background-color: #873780;
                        padding: 10px 20px;
                        border-radius: 5px;
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

                    /* Pie de página */
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #555;
                    }

                    /* Modo oscuro */
                    @media (prefers-color-scheme: dark) {
                        body {
                            background-color: #121212;
                            color: #ddd;
                        }

                        .all {
                            background-color: #121212;
                        }

                        .container {
                            background-color: #1e1e1e;
                            box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
                        }

                        .header {
                            background-color: #333;
                            color: white;
                        }

                        .content p {
                            color: #ddd;
                        }

                        .footer {
                            color: #aaa;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="all">
                    <div class="container">
                        <div class="header">
                            <h1>Modisteria D.L</h1>
                        </div>
                        <div class="content">
                            <h2>¡Hola!</h2>
                            <p>Este correo ha sido enviado por la modista Doña Luz, avisandote que la venta fue confirmada!</p>
                            <p>Estaremos próximos para la confección de tus prendas</p>
                        </div>
                        <div class="footer">
                            <p>Este correo es automático, por favor no responder</p>
                            <p>&copy; 2024 Modisteria D.L. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>`,
    };
    // Enviar correo
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      msg: "Venta confirmada, pedidos actualizados y correo enviado",
      usuarioId, // Opcional: devolver el ID del usuario
    });
  } catch (error) {
    console.error("Error al confirmar la venta:", error);
    res.status(500).json({ msg: "Error al confirmar la venta", error });
  }
};

exports.cancelarVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const { motivo } = req.body;

    const venta = await getVentaById(id);
    if (!venta) {
      return res.status(404).json({ msg: "Venta no encontrada" });
    }

    if (!motivo) {
      return res.status(400).json({ msg: "El motivo de cancelación es obligatorio." });
    }

    if (venta.citaId !== null) {
      const cita = await getCitaById(venta.citaId);
      if (!cita) {
        return res
          .status(404)
          .json({ msg: "No se encontró la cita asociada a esta venta" });
      }
      await Cita.update(
        { estadoId: 12 }, // Estado cancelada
        { where: { id: cita.id } }
      )

      const usuarioId = cita.usuarioId;
    }
    else {
      const pedidos = await getPedidoByVenta(id);
      if (pedidos.length === 0) {
        return res
          .status(404)
          .json({ msg: "No hay pedidos asociados a esta venta" });
      }
      await Promise.all(
        pedidos.map(async (producto) => {
          await Pedido.update(
            { estadoId: 12 }, // Estado cancelado
            { where: { id: producto.id } }
          );
        })
      );
    }
    const cambioVenta = { estadoId: 12, motivo: motivo }; // Estado cancelada
    await updateVenta(id, cambioVenta);


    // const mailOptions = {
    //   from: "modistadonaluz@gmail.com",
    //   to: email,
    //   subject: "Venta cancelada",
    //   html: `<!DOCTYPE html>
    //         <html lang="es">
    //         <head>
    //             <meta charset="UTF-8">
    //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //             <title>Código de recuperación</title>
    //             <style>
    //                 body {
    //                     background-color: #f4f4f4;
    //                     font-family: Arial, sans-serif;
    //                     margin: 0;
    //                     display: flex;
    //                     justify-content: center;
    //                     align-items: center;
    //                     min-height: 100vh;
    //                 }

    //                 .all, .container {
    //                     max-width: 500px;
    //                     width: 100%;
    //                     margin: 0 auto;
    //                     border-radius: 8px;
    //                 }

    //                 .all {
    //                     background-color: #f4f4f4;
    //                     padding: 10px;
    //                 }

    //                 .container {
    //                     background-color: #ffffff;
    //                     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    //                     text-align: center;
    //                 }

    //                 .header {
    //                     background-color: #873780;
    //                     color: white;
    //                     padding: 20px;
    //                     border-radius: 8px 8px 0 0;
    //                 }

    //                 .header h1 {
    //                     margin: 0;
    //                     font-size: 30px;
    //                 }

    //                 /* Contenido principal */
    //                 .content {
    //                     padding: 20px;
    //                 }

    //                 .content p {
    //                     font-size: 18px;
    //                     color: #333;
    //                     line-height: 1.5;
    //                     margin: 20px 0;
    //                 }

    //                 .verification-code {
    //                     font-size: 32px;
    //                     font-weight: bold;
    //                     letter-spacing: 2px;
    //                     color: #ffffff;
    //                     background-color: #873780;
    //                     padding: 10px 20px;
    //                     border-radius: 5px;
    //                     display: inline-block;
    //                     margin: 20px 0;
    //                 }

    //                 .btn {
    //                     display: inline-block;
    //                     padding: 12px 25px;
    //                     font-size: 16px;
    //                     color: white;
    //                     background-color: #4CAF50;
    //                     text-decoration: none;
    //                     border-radius: 5px;
    //                     margin-top: 20px;
    //                 }

    //                 /* Pie de página */
    //                 .footer {
    //                     margin-top: 20px;
    //                     font-size: 12px;
    //                     color: #555;
    //                 }

    //                 /* Modo oscuro */
    //                 @media (prefers-color-scheme: dark) {
    //                     body {
    //                         background-color: #121212;
    //                         color: #ddd;
    //                     }

    //                     .all {
    //                         background-color: #121212;
    //                     }

    //                     .container {
    //                         background-color: #1e1e1e;
    //                         box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
    //                     }

    //                     .header {
    //                         background-color: #333;
    //                         color: white;
    //                     }

    //                     .content p {
    //                         color: #ddd;
    //                     }

    //                     .footer {
    //                         color: #aaa;
    //                     }
    //                 }
    //             </style>
    //         </head>
    //         <body>
    //             <div class="all">
    //                 <div class="container">
    //                     <div class="header">
    //                         <h1>Modisteria D.L</h1>
    //                     </div>
    //                     <div class="content">
    //                         <h2>¡Hola!</h2>
    //                         <p>Este correo ha sido enviado por la modista Doña Luz, avisandote que la venta fue cancelda.</p>
    //                         <p>El motivo es: ${motivo}</p>
    //                     </div>
    //                     <div class="footer">
    //                         <p>Este correo es automático, por favor no responder</p>
    //                         <p>&copy; 2024 Modisteria D.L. Todos los derechos reservados.</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </body>
    //         </html>`,
    // };
    // // Enviar correo
    // await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "Venta cancelada con éxito." });
  } catch (error) {
    console.error("Error al cancelar la venta:", error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
}