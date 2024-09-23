const constantsRoles = require('../constants/role.constants');
const constantsPermisos = require('../constants/permiso.constants');
const { getRoleById } = require('../repositories/role.repository');
const { getUserByEmail } = require('../repositories/usuario.repository');

exports.validateRoleAdmin = (req, res, next) => {
    if (req.roleId !== constantsRoles.ROL_ADMIN) return res.status(403).json({ msg: 'No tiene los permisos suficientes' });
    next();
}

exports.validateRoleAdminAndEmployee = (req, res, next) => {
    if (!(req.roleId == constantsRoles.ROL_ADMIN || req.roleId == constantsRoles.ROL_EMPLOYED)) return res.status(403).json({ msg: 'No tiene los permisos suficientes' });
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

async function validadora (roleId, permiso) {
    return (await getRoleById(roleId)).toJSON().permisosId.includes(permiso);
}

//Opcion2
// exports.validateRolPermiso = async (req, res, next) => {
//     const rolesPermisos = (await getRoleById(req.roleId)).toJSON().permisosId
//     if (req.body.validate == "UserValidate" && rolesPermisos.includes(1)){
//         return next()
//         // console.log("AAAA", rolesPermisos);    
//     } else if (req.body.validate == "CitasValidate" && rolesPermisos.includes(2)) {
//         return next()

//     }
//     // next();
// }

exports.emailExist = async (req, res, next) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user) return res.status(400).json({ msg: 'El correo ya existe' });
    next();
}