const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-token'];

    if (!token) return res.status(401).json({ msg: 'No han proporcionado el token' });

    jwt.verify(token, process.env.KEY_JWT, (err, decoded) => {
        if (err) return res.status(401).json({ msg: 'No está autorizado' });
        req.userId = decoded.payload.id;
        req.email = decoded.payload.email;
        req.role = decoded.payload.role;
        next();
    });
}