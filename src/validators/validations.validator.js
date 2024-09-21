// const constants = require('../constants/role.constants');
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

exports.emailExist = async (req, res, next) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user) return res.status(400).json({ msg: 'El correo ya existe' });
    next();
}