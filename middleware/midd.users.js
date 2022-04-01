const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const dbUser = require('../app/model.users');
const userVal = require('../app/controller.users')

module.exports.validateUserLogin = (req, res, next) => {
    console.log("Datos del usuario ", req.body);
    try {
        if(req.body.id != '' && req.body.pass != ''){
            console.log("con contraseña y password")
            return next();
        }else{
                return (console.log("Ingrese usuario y contraseña"));
            
        }
            
    } catch (error) {
     return error;   
    }
    }
    

    module.exports.userAuth = async (req, res, next) => {
        const tokHeader = req.headers['authorization'];

        console.log("este  es el requ en el middAuth---> ",tokHeader);
        if(typeof tokHeader != 'undefined'){
            try {
                let session = await promisify(jwt.verify)(tokHeader.split(" ")[1], process.env.SECRET_KEY);
                //let result = await dbUser.userAuth(session);
                console.log("resultado ----> ", session)
    
                if(!session){
                    return next();
                }
                //req.user_name = result[0][1];
                return next();
            } catch (error) {
                console.log("Hubo un error", error)
                return error;
            }
        }else{
            res.send('Es necesario estar logueado');
        }
    }
    
    module.exports.addUser = async (req, res, next) =>{
            console.log("en el midd de registro", req.body.name);
        try{
            let validates = userVal.fieldsValidate(req.body);
            console.log("Resultado de las validaciones ====> ", validates); 
            if(validates === true){
                next();
            }else{
                res.send(validates);
            }
                     
        }catch(error){
            res.send(error);
        }
    }

    
    module.exports.logout = (req, res) =>{
        const tokHeader = req.headers['authorization'];

        console.log(res.clearCookie());
        res.clearCookie('session_jwt');
        res.cookie('jwt','',{maxAge: 1});
        delete(tokHeader);
        return res.send('Sesión terminada');
    }
    
    