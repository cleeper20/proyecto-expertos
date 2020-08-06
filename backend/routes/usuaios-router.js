const express = require('express');//importar express
const router = express.Router();// importar el router para recibir peticiones
const modelUser = require('../models/user');//importar el model user
const jwt = require('jsonwebtoken')

router.get('/', (req,res)=>{
    res.send('hola desde router usuarios')
})

//nuevo usuario
router.post('/singup', async (req,res)=>{
    let {nombres, apellidos,email, password, numeroTarjeta, fechaExpiracion,codigoCVV}=req.body;//capturando datos del cuerpo de la peticion 
    //instanciando objeto

    let newUser = new modelUser({nombres, apellidos,email, password, numeroTarjeta, fechaExpiracion,codigoCVV})
    await newUser.save()
    .then(consulta=>{
        const token = jwt.sign({_id:newUser._id},'palabraSecreta')//3 opciones:1 dato que queremos guardar dentro del token, 2 una palabra secreta, 3 opciones del token evisar documentacion del modulo ejemplo la duracion del token
        res.status(201).json({token})
        res.end();
    }).catch(error=>{
        res.status(304).send(error);
        res.end();
    })

});

//actualizar usuario
router.put('/updateuser/:id',(req,res)=>{
    
    modelUser.update(//dos paramatros JSon, el primero es el filtro y el segundo son los datos
    {
        _id:req.params.id
    },

    {nombres, apellidos,email, password, numeroTarjeta, fechaExpiracion,codigoCVV}=req.body
     
    ).then(consulta=>{
        res.status(202).send(consulta);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})





module.exports = router;