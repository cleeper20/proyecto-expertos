var mongoose = require('mongoose');

var esquema = mongoose.Schema(
    {
        nombres:String,
        apellidos:String,
        email:String,
        password:String,
        numeroTarjeta:Number,
        fechaExpiracion:mongoose.SchemaTypes.Mixed,
        codigoCVV:Number,

    },
    {
        timestamps:true,
    }

);

module.exports = mongoose.model('usuarios',esquema, 'users')