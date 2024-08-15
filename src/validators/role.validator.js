const constants = require('../constants/role.constants');
const { getUserByEmail } = require('../repositories/usuario.repository');

exports.validateRoleAdmin = (req, res, next) => {
    if (req.role !== constants.ROL_ADMIN) return res.status(403).json({ msg: 'No tiene los permisos suficientes' });
    next();
}

exports.emailExist = async (req, res, next) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user) return res.status(400).json({ msg: 'El correo ya existe' });
    next();
}