const jwt = require('jsonwebtoken');
exports.generateToken = (user) => {
    payload = {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        telefono: user.telefono,
        password: user.password,
        roleId: user.roleId,
        direccion: user.direccion
    }
    const token = jwt.sign({ payload }, process.env.KEY_JWT , { expiresIn: '1h' });
    return token;
}
