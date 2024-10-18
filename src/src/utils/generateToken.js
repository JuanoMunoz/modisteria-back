const jwt = require('jsonwebtoken');
const { use } = require('./mailer');
exports.generateToken = (user) => {
    payload = {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        telefono: user.telefono,
        password: user.password,
        direccion: user.direccion,
        role: user.role
    }
    const token = jwt.sign({ payload }, process.env.KEY_JWT , { expiresIn: '20h' });
    return token;
}
