var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var esquema = new mongoose.Schema(
    {
        nombres:String,
        apellidos:String,
        email:String,
        password:String,
        titular:String,
        numeroTarjeta:Number,
        fechaExpiracion:mongoose.SchemaTypes.Mixed,
        codigoCVV:Number,
        tipoCuenta:String,

    },
    {
        timestamps:true,
    }

);

esquema.pre('save',function(next){//encriptado de contraseña, el pre indica antes de guardar
const usuario = this;//este usuario
if(!usuario.isModified('password')){
    return next();// si no es modificaddo
}

    bcrypt.genSalt(10,(error,salt)=>{//salt tiene que ver con metodos de encriptacion, genero el salt
        if(error){
            next(error);
        }

        bcrypt.hash(usuario.password, salt, null, (error, hash)=>{
            if(error){
                next(error);
            }
            usuario.password=hash;
            next();
        })
    })
})



module.exports = mongoose.model('usuarios',esquema, 'users')