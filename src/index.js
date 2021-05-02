const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path= require('path');
const bodyParser = require('body-parser');

//inicio 
const app = express();

//configuraciones
app.set('port',process.env.PORT || 4000);

//variables globales 
app.use((req, res, next)=>{
    next();
});

//peticiones 
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

const usuario = require('./routes/usuario');
app.use("/usuarios",usuario);

const servicio = require('./routes/servicio');
app.use("/servicios",servicio);

const reserva = require('./routes/reserva');
app.use("/reservas",reserva);

const producto = require('./routes/producto');
app.use("/productos",producto);

const pqr = require('./routes/pqr');
app.use("/pqr",pqr);

const inventario = require('./routes/inventario');
app.use("/inventarios",inventario);

const compra = require('./routes/compra');
app.use("/compras",compra);

const comidas = require('./routes/comidas');
app.use("/comidas",comidas);

const distribuidores = require('./routes/distribuidores');
app.use("/distribuidores",distribuidores);

const inicio = require('./routes/inicioS');
app.use("/inicio",inicio)

const empleado = require('./routes/empleado');
app.use("/empleados",empleado);


//public 
app.unsubscribe(express.static(path.join(__dirname,'public')));
//iniciar el servidor 
app.listen(app.get('port'),()=>{
    console.log('servidor conectado en puerto:',app.get('port'));
});