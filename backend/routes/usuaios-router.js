const express = require('express');//importar express
const router = express.Router();// importar el router para recibir peticiones
const modelUser = require('../models/user');//importar el model user
const jwt = require('jsonwebtoken');//token
const bcrypt = require('bcrypt-nodejs');
let datos='';



//nuevo usuario
router.post('/singup', async (req,res)=>{
    let {nombres, apellidos,email, password,titular, numeroTarjeta, fechaExpiracion,codigoCVV,tipoCuenta}=req.body;//capturando datos del cuerpo de la peticion 
    //instanciando objeto

    let newUser = new modelUser({nombres, apellidos,email, password, titular,numeroTarjeta, fechaExpiracion,codigoCVV,tipoCuenta});
    const idUser=newUser._id;
    await newUser.save()
    .then(consulta=>{
        const token = jwt.sign({_id:newUser._id},'palabraSecreta')//3 opciones:1 dato que queremos guardar dentro del token, 2 una palabra secreta, 3 opciones del token evisar documentacion del modulo ejemplo la duracion del token
        res.status(201).json({token,idUser})
        res.end();
    }).catch(error=>{
        res.status(304).send(error);
        res.end();
    })

});

router.post('/singin', async (req,res)=>{
    const {email, password} = req.body;//recibir los datos
     //console.log({email});
    const  user = await modelUser.findOne({email});
   
    
    if(user===null){
        return res.status(401).send('El correo es invalido');
    }

    //res.send(user);

    bcrypt.compare(password, user.password, function(error, result){
        if(result !== true){
            return res.status(401).send('contraseña invalida');
        }else{
            const idUser = user._id;

            const token = jwt.sign({_id:user._id}, 'palabraSecreta', { expiresIn: '1h' });
            return res.status(200).json({token, idUser});
        }
    });
});

//buscar usuario
console.log(datos)
router.get('/', verificarToken , (req,res)=>{
        modelUser.find({_id:datos._id}).then(consulta =>{
            res.status(200).send(consulta[0]);//el elemento cero del arreglo de objetos
            res.end();
        }).catch(error=>{
            res.status(404).send(error);
        })
        });

//actualizar usuario

router.put('/updateuser/:id', verificarToken ,(req,res)=>{
   var passwordSecret;
    
    var password=req.body.password;
    console.log(password);

    bcrypt.genSalt(10,(error,salt)=>{//salt tiene que ver con metodos de encriptacion, genero el salt
        if(error){
             return res.status(400).send(error);
        }

        bcrypt.hash(password, salt, null, (error, hash)=>{
            if(error){
                return res.status(400).send(error);
            }
            
            passwordSecret=hash;
            modelUser.findOneAndUpdate(//dos paramatros JSon, el primero es el filtro y el segundo son los datos
                {
                    _id:req.params.id
                },
            
                {nombres:req.body.nombres,
                apellidos:req.body.apellidos,
                email:req.body.email,
                password:passwordSecret,
                titular:req.body.titular,
                numeroTarjeta:req.body.numeroTarjeta,
                fechaExpiracion:req.body.fechaExpiracion,
                codigoCVV:req.body.codigoCVV,
                tipoCuenta:req.body.codigoCVV
                },
            
                {
                    new:true,
                    overwrite:true
                }
                 
                ).then(consulta=>{
                    res.status(202).send(consulta);
                    res.end();
                }).catch(error=>{
                    res.send(error);
                    res.end();
                })
           
           
          
        })
        
    })

   
   
    //res.status(202).send('si llega basura')
   
})


function verificarToken(req, res, next){
    if(!req.headers.authorization){// el token se envia por el encabezado de la peticion 
        return res.status(401).send('Unathorize Request1');
    }

    const token = req.headers.authorization.split(' ')[1]//estoy seprando el string Bearer token, y recuperando el token [1] es la posicion del arreglo donde esta guardado el token
    if(token === null){
        return res.status(401).send('Unathorize Request2');
    }

    //le estoy enviando el token y la palabra secreta previamente definida
  
    const payload = jwt.verify(token, 'palabraSecreta', function(err, decoded){
        if(!err){
            datos=decoded;
            req.userId = decoded;//una vez recuperado el id guardado detro del token lo guardo
            //console.log(payload); //imprimo el id del usuario que estaba guardado en el token
            next();//continuar 
        }else{
            return res.status(401).send('Unathorize Request3 '+err);
        }
       
    });
 
   

      
}



module.exports = router;