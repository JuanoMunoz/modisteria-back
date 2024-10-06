const constantsRoles = require('../constants/role.constants');
const constantsPermisos = require('../constants/permiso.constants');
const { getRoleById } = require('../repositories/role.repository');
const { getUserByEmail } = require('../repositories/usuario.repository');

exports.validateRoleAdmin = (req, res, next) => {
    if (req.roleId !== constantsRoles.ROL_ADMIN) return res.status(403).json({ msg: 'No tiene los permisos suficientes' });
    next();
}

exports.validateRoleAdminAndDomiciliario = (req, res, next) => {
    if (!(req.roleId == constantsRoles.ROL_ADMIN || req.roleId == constantsRoles.ROL_DOMICILIARIO)) return res.status(403).json({ msg: 'No tiene los permisos suficientes' });
    next();
}

exports.validateRolPermisoUsuario = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_USUARIO) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoCita = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_CITAS) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoVenta = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_VENTAS) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoDashboard = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_DASHBOARD) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoCatalogo = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_CATALOGO) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoCategoria = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_CATEGORIA) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoCotizacion = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_COTIZACION) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoDomicilio = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_DOMICILIO) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoEstado = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_ESTADO) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoInsumo = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_INSUMO) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoPedido = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_PEDIDO) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoPermiso = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_PERMISO) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoPQRS = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_PQRS) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoRoles = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_ROLES) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

exports.validateRolPermisoTalla = async (req, res, next) => {
    validadora(req.roleId, constantsPermisos.PERMISO_TALLA) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
}

async function validadora (roleId, permiso) {
    return (await getRoleById(roleId)).toJSON().permisosId.includes(permiso);
}

exports.emailExist = async (req, res, next) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user) return res.status(400).json({ msg: 'El correo ya existe' });
    next();
}