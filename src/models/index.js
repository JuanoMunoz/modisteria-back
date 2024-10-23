const { Usuario } = require("./usuario.model");
const { Role } = require("./role.model");
const { Permiso } = require("./permiso.model");
const { Insumo } = require("./insumo.model");
const { Categoria } = require("./categoria.model");
const { Catalogo } = require('./catalogo.model.js');
const { Cita } = require('./cita.model.js');
const { Verificacion } = require('./verificacion.model.js');
const { CatalogoInsumos } = require('./catalogo_insumos.model.js')
const { Domicilio } = require('./domicilio.model.js')
const { PQRS } = require('./pqrs.model.js')
const { Pedido } = require('./pedido.model.js')
const { Estado } = require('./estado.model.js')
const { Venta } = require('./venta.model.js')
const { CitaInsumo} = require('./cita_insumo.model.js')
const { Talla } = require("./talla.model.js");

module.exports = { Usuario, Role, Permiso, Insumo, Categoria, Catalogo, Cita, CatalogoInsumos, Domicilio, PQRS, Verificacion, Pedido, Estado, Venta, CitaInsumo, Talla };
