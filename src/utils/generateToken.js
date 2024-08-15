const jwt = require('jsonwebtoken');
exports.generateToken = (user) => {
    payload = {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        role: user.roleId
    }
    const token = jwt.sign({ payload }, process.env.KEY_JWT , { expiresIn: '1h' });
    return token;
}
