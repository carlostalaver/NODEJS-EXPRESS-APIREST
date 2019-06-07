const express = require('express');
const session =  require('express-session');
const MongoStore = require('connect-mongo')(session);
const MONGO_URL = 'mongodb://127.0.0.1:27017/auth';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);  


const app =  express();

app.use(session({
  secret: 'ESTO ES UN SECRETO',
  resave:true,
  saveUninitialized: true,
  store: new MongoStore({
    url: MONGO_URL,
    autoReconnect: true,

  })
}))

app.get('/', (req, res)=>{
req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1: 1;

  res.send(`Hola que tal  la cuenta es ${req.session.cuenta}`)
});

app.listen(3000, () => {
  console.log('escuchando en el puerto 3000');
  
})