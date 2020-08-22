var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var esquema = new mongoose.Schema(
    {
        nombre:String,
        idUser:String,
        padre:String,
        subCarpetas:Array,
        proyectos:Array,
        

    },
    {
        timestamps:true,
        
    }

);

module.exports = mongoose.model('carpetas',esquema)
