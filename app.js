
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const newUser = require('./app/routes.users')
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser());

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