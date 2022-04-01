//express
const express = require('express');
const app = express();

//cookie
//const cookieParser = require('cookie-parser');

//Enviroment Variables
require('dotenv').config();

//DB Connection
const mongoose = require('mongoose');


//Routes
const newUser = require('./app/routes.users')

//urlencode captura los datos del formulario
app.use(express.urlencoded({extended:true}));

//Lenguaje for comunication
app.use(express.json())

//cookie
//app.use(cookieParser());

async function serverStart() {

        mongoose.connect(process.env.DB_HOST + process.env.DB_DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true 
             }).then(r => {
                app.listen(process.env.PORT, () => {
                    console.log("Servidor iniciado en el puerto " + process.env.PORT)
                })
             }).catch(error => {
                 console.log(error);
                 console.log("No ha sido posible conectar con la base de datos")
             });
    
    
        
  }
  
  serverStart();
  newUser(app);