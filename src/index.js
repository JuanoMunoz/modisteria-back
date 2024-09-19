require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { connection } = require('./database/connection');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Configuración de rutas
app.use('/api/usuarios', require('./routers/usuario.routes'));
app.use('/api/roles', require('./routers/role.routes'));
app.use('/api/permisos', require('./routers/permiso.routes'));
app.use('/api/insumos', require('./routers/insumo.routes'));
app.use('/api/categorias', require('./routers/categoria.routes'));
app.use('/api/catalogos', require('./routers/catalogo.routes'));
app.use('/api/citas', require('./routers/cita.routes'));
app.use('/api/catalogoinsumos', require('./routers/catalogoinsumos.routes'));


app.use('*', (req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada, por favor contacta el administrador' });
});

(async () => { await connection(); })();


app.listen(port, () => {
    console.log(`El server está funcionando en el puerto ${port}`);
});
