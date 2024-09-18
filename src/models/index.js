const { Usuario } = require("./usuario.model");
const { Role } = require("./role.model");
const { Permiso } = require("./permiso.model");
const { Insumo } = require("./insumo.model");
const { Categoria } = require("./categoria.model");
const { Catalogo } = require('./catalogo.model.js');
const { Prenda } = require('./prenda.model.js');
const { Cita } = require('./cita.model.js');
const { CatalogoInsumos } = require('./catalogo_insumos.model.js')
const { Domicilio } = require('./domicilio.model.js')

module.exports = { Usuario, Role, Permiso, Insumo, Categoria, Catalogo, Prenda, Cita, CatalogoInsumos, Domicilio };