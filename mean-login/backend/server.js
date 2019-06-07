'use extrict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes')
const express = require('express');
const app =  express();
const router = express.Router();  
const bodyParser = require('body-parser');
const DB = require('./config/db')

app.use(cors()); // con esto se habilitan TODAS las peticiones hacia el server, se pueden filtar y todo mas. Leer la DOCUMENTACION
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true})

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

DB(); // para iniciar la Base de datos
app.use('/api',router )

authRoutes(router);

router.get('/', (req, res) => {
   res.send('Hello  from home')
});

app.use(router);

//#region CONFIGURACION
app.set('port', process.env.PORT || 4000);
//#endregion
app.listen(app.get('port'), () =>{
   console.log('Servidor corriendo por el puerto ', app.get('port'));
   
} )