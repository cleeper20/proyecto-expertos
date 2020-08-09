const express = require('express');//importar express
const bodyParser = require('body-parser');
const usuariosRouter = require('./routes/usuaios-router');//router
const cors = require('cors') // para peticiones cruzadas
require('./database/database');//establecer conexion

const app = express();




//middlaware
app.use(express.json());//aceptar json en la peticion 
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user',usuariosRouter );


app.get('/',(req,res)=>{
    res.send('Funciona')
})



app.listen(8888);
console.log('server on port',8888)