require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const {connection} = require('./database/connection');

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json())
app.use(morgan('dev'));

app.use('/api', 
    require('./routers/usuario.routes'),
    require('./routers/role.routes'),
    require('./routers/permiso.routes'),
    require('./routers/insumo.routes'),
    require('./routers/categoria.routes'),
    require('./routers/catalogo.routes'),
    require('./routers/prenda.routes'),
    require('./routers/cita.routes'),
);


app.use('*', (req, res)=>{
    res.status(404).json({message: 'Ruta no encontrada, por favor contacta el administrador'});
});

(async ()=>{ await connection() })();


app.listen(port, ()=>{
    console.log(`el server esta funcionando en el puerto ${port}`);
})