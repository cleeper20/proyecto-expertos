var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/c-drive',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(res => console.log('conexion a base de datos establecida'))
  .catch(error => console.log(error))