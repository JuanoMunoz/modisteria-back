const constants = require('../constants/role.constants');
const { getRoleById } = require('../repositories/role.repository');
const { getUserByEmail } = require('../repositories/usuario.repository');

// exports.validatePermission = (requiredPermissions) => (req, res, next) => {
//     try {
//         const { permissions } = req.user;

//         console.log('User Permissions:', permissions); // Verifica qué permisos tiene el usuario
//         console.log('Required Permissions:', requiredPermissions);

//         const hasAllPermissions = requiredPermissions.every(permiso =>
//             permissions.includes(permiso)
//         );

//         if (!hasAllPermissions) {
//             return res.status(403).json({ msg: 'No tiene los permisos suficientes' });
//         }

//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: 'Error en la validación de permisos' });
//     }
// };

exports.validateRoleAdmin = (req, res, next) => {
    if (req.roleId !== constants.ROL_ADMIN) return res.status(403).json({ msg: 'No tiene los permisos suficientes' });
    next();
}

exports.validateRoleAdminAndEmployee = (req, res, next) => {
    if (!(req.roleId == constants.ROL_ADMIN || req.roleId == constants.ROL_EMPLOYED)) return res.status(403).json({ msg: 'No tiene los permisos suficientes' });
    next();
}

exports.validateRolPermisoUsuario = async (req, res, next) => {
    validadora(req.roleId, constants.PERMISO_USUARIO) ? next() : res.status(401).json({ msg: 'No tiene los permisos suficientes' })
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