var express = require('express');
var router = express.Router();
var carpeta = require('../models/carpeta')
var mongoose = require('mongoose')

const jwt = require('jsonwebtoken');//token
const bcrypt = require('bcrypt-nodejs');
const { find } = require('../models/carpeta');
let data='';
//obtener Carpetas
router.get('/carpetas/usuario',verificarToken,(req,res)=>{

    //console.log(data._id);

    carpeta.find({idUser:data._id, padre:'0'},{_id:true, nombre:true, padre:true}).then(
        resultado=> {
            res.status(200).send(resultado)
                     res.end();   
        },

        
    ).catch(
        err=> {res.status(404).send(err)
               res.end();         
        }
    )

})

//obtenerSuCapetas y proyectos de carpeta
router.get('/subCarpetas/:idPadre',verificarToken,(req,res)=>{

        if(req.params.idPadre==0){
            res.status(200).json({'mensaje':'Carpeta Raiz'})
            res.end()
            return;
        }
    
    carpeta.find({_id:req.params.idPadre},{subCarpetas:true, _id:true, proyectos:true,  padre:true},{returnOriginal: false}).then(
        resultado=> {
            //console.log(resultado[0].proyectos)
            res.status(200).json(resultado[0])
            res.end();   
        },

        
    ).catch(
        err=> {res.status(404).send(err)
               res.end();         
        }
    )

})




//nueva carpeta raiz
router.post('/nuevaCarpeta/raiz',verificarToken, (req,res)=>{
    let nuevaCarpeta = new carpeta({
        nombre:req.body.nombre,
        idUser:data._id,
        padre:0,
        subCarpetas:[],
        proyectos:[],
    })

    nuevaCarpeta.save().then(
        resultado=>{ res.status(200).send(resultado)
                    res.end()
        },

        
    ).catch(
        err=> {res.status(400).send(err)
            res.end();
        }
    )
})

//agregar subCarpeta
router.post('/nueva/subCarpeta/:idCarpetaPadre',verificarToken,(req,res)=>{

   // console.log(data._id)
    let nuevaCarpeta = new carpeta({
        nombre:req.body.nombre,
        idUser:data._id,
        padre:req.params.idCarpetaPadre,
        subCarpetas:[],
        proyectos:[],
    })

    nuevaCarpeta.save().then(

      async  resultado=>{

                        

                   await carpeta.update({_id:req.params.idCarpetaPadre},{
                        $push:{
                            subCarpetas:{
                                _id:mongoose.Types.ObjectId(),
                                idCarpeta:resultado._id,
                                nombre:req.body.nombre,
                                padre:req.params.idCarpetaPadre
                            }
                        }
                    }).catch(
                        err=>{
                            res.status(400).send(err);
                            res.end();
                        }
                    )

                    res.status(200).send(resultado);
                    res.end()      

                    }//--------------------------------------------------
             

    ).catch(
        err=>{
            res.status(400).send(err);
            res.end();
        }
    )


})

//cambiar nombre de carpeta
router.post('/carpeta/cambiarNombre/:idCarpeta',verificarToken,(req,res)=>{

    carpeta.updateOne({_id:req.params.idCarpeta},{nombre:req.body.nombre}, {returnOriginal: false}).then(

       resultado44=>
       { res.status(200).send(resultado44);
        res.end();
    }
    ).catch(
        err=>{
            res.status(400).send(err);
            res.end();
        }
    )

})

//eliminar carpeta hijo da Error, responde que si lo hizo pero no realizo la accion
router.delete('/removerHijo/:idCarpetaPadre/:idSubCarpeta',verificarToken,(req,res)=>{

    carpeta.update({_id:req.params.idCarpetaPadre},{ $pull:{ subCarpetas:{idCarpeta:req.params.idSubCarpeta}}}).then(
        resultado=>{
            res.status(200).send(resultado);
            res.end();
        }      
    ).catch(
        err=>{
            res.status(400).send(err);
            res.end()
        }
    )


})
//obtener proyecto

router.get('/proyecto/:idProyecto/carpeta/:idCarpeta',verificarToken, (req,res)=>{
    carpeta.find({_id:req.params.idCarpeta, "proyectos._id":mongoose.Types.ObjectId(req.params.idProyecto)}).then(
   resultado=> {
              

                let respuesta={};
               respuesta = obtenerElemento(resultado[0].proyectos,req.params.idProyecto);
               res.status(200).send(respuesta);
               res.end();

            }).catch(
                err=>{
                    res.status(400).send();
                    res.end();
                }
                
            )
    
})

function obtenerElemento(arreglo,idProyecto){
    let proyecto={};
    if(!arreglo){
        return proyecto;
    }

    arreglo.forEach((elemento,i) => {
            if(elemento._id==idProyecto){
                proyecto=elemento;
                return proyecto;
            }
        
    });

    return proyecto;
}

//guardar proyectos
router.post('/proyectoAgregar/:idCarpeta',verificarToken, (req,res)=>{
    carpeta.updateOne({_id:req.params.idCarpeta},{
        $push:{
            proyectos:{
                _id:mongoose.Types.ObjectId(),
                padre:req.params.idCarpeta,
                nombre:req.body.nombre,
                html:req.body.html,
                js:req.body.js,
                css:req.body.css
            }
        }
    }).then(
        resultado=>{
            res.status(200).send(resultado);
            res.end();
        }
    ).catch(
        err=>{
            res.status(400).send(err);
            res.end();
        }
    )
})

//eliminar proyecto
router.delete('/eliminarProyecto/:idProyecto/carpeta/:idCarpeta',verificarToken,(req,res)=>{
        carpeta.find({_id:req.params.idCarpeta, "proyectos._id":mongoose.Types.ObjectId(req.params.idProyecto)}     
        ).then(
            resultado=>{
             let = arregloActalizado=[];
             
             arregloActalizado = actualizarArrayProyectos(resultado[0].proyectos,req.params.idProyecto)

                        carpeta.update({_id:req.params.idCarpeta, "proyectos._id":mongoose.Types.ObjectId(req.params.idProyecto)},{
                            proyectos:arregloActalizado
                        }).then(
                            resultado2=>{
                                res.status(200).send(resultado2);
                                res.end();
                            }
                        ).catch(
                            err=>{
                                res.status(400).send(err);
                                res.send();
                            }
                        )

            }
        ).catch(
            err=>{
                res.status(400).send(err);
                res.end();
            }
        )
}
)

function actualizarArrayProyectos(arreglo, idProyecto){
    // console.log(arreglo)
    if(arreglo){
      let indice=null;
      arreglo.forEach((proyecto,i) => {
          if(proyecto._id == idProyecto){
                  indice=i;  
          }
      });
      
      arreglo.splice(indice,1)
      return arreglo;
  
    }else{
          return
      }
        
  }




//borrar carpeta hija y decendientes
router.delete('/eleminarCarpeta/:idCarpeta/:idCarpetaPadre',verificarToken,(req,res)=>{
var pps=0;
   carpeta.find({_id:req.params.idCarpeta},{subCarpetas:true}).then(
        respuesta=>{
           
            eliminarSubCarpetas( respuesta[0].subCarpetas);
        }
    )

   
    




    var  carpetas=0;

    carpeta.remove({_id:req.params.idCarpeta}).then(
      async resultado => {
            
             await carpeta.find({_id:req.params.idCarpetaPadre},{subCarpetas:true}).then(
                 resultado2=>{
                     carpetas = resultado2;
                     //console.log(resultado2)
                 }
             ).catch(
                 err=>{
                     res.status(400).send(err)
                 }
             )

             let arregloAtualizado = actualizarArrayPadre(carpetas[0].subCarpetas, req.params.idCarpeta);
                 //console.log(arregloAtualizado);

             await carpeta.update({_id:req.params.idCarpetaPadre},{subCarpetas:arregloAtualizado}).then(
                 resultado3=>{
                   //  console.log(resultado3)
                 }
             )
             .catch(
                err=> res.status(400).send(err)
             )

          
           
            res.status(200).send(resultado);
            res.end()
        
                }
        
    ).catch(
        err=> res.status(400).send(err)
    )

   
})

function actualizarArrayPadre(arreglo, idHijo){
  // console.log(arreglo)
  if(arreglo){
    let indice=null;
    arreglo.forEach((carpeta,i) => {
        if(carpeta.idCarpeta == idHijo){
                indice=i;  
        }
    });
    
    arreglo.splice(indice,1)
    return arreglo;

  }else{
        return
    }
      
}
//---------------------------------------------------

//elimnar carpeta raiz

router.delete('/elimnarCarpeta/:idCarpeta/raiz/:raiz',verificarToken, (req,res)=>{
var carpetasArreglo=0;

     carpeta.find({_id:req.params.idCarpeta, padre:req.params.raiz}).then(
     async  resultado=>{
             
        eliminarSubCarpetas(resultado[0].subCarpetas);

      await  carpeta.remove({_id:req.params.idCarpeta, padre:req.params.raiz}).then(
          eliminar=>{
              res.status(200).send(eliminar);
              res.end();
          }
      ).catch(
          err=>{
              res.status(400).send(err);
              res.end();
          }
      )

       }
   ).catch(
       err=>{
           res.status(400).send(err);
           res.end();
       }
   )


})

//eliminar subCarpetas
function eliminarSubCarpetas(subCarpetas){
    if(subCarpetas){
    subCarpetas.forEach( async Elemento => {
       await carpeta.remove({_id:Elemento.idCarpeta})
        
    });
        return
    }else{
        return
    }
}

//-------------------------------------proyectos--------------------------------------
//agregar proyecto



//recuperar id
function verificarToken(req, res, next){
    if(!req.headers.authorization){// el token se envia por el encabezado de la peticion 
        return res.status(401).send('Unathorize Request');
    }

    const token = req.headers.authorization.split(' ')[1]//estoy seprando el string Bearer token, y recuperando el token [1] es la posicion del arreglo donde esta guardado el token
    if(token === null){
        return res.status(401).send('Unathorize Request');
    }

    //le estoy enviando el token y la palabra secreta previamente definida
  
    const payload = jwt.verify(token, 'palabraSecreta', function(err, decoded){
        if(!err){
            
            data = decoded;
            req.userId = decoded;//una vez recuperado el id guardado detro del token lo guardo
            //console.log(payload); //imprimo el id del usuario que estaba guardado en el token
            next();//continuar 
        }else{
            return res.status(401).send('Unathorize Request3 '+err);
        }
       
    });
 
   

      
}


module.exports = router;