const users = require('./controller.users');
const usersMidd = require('../middleware/midd.users')
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    

    app.post('/newUser', usersMidd.addUser, async (req, res) => {
        console.log('Dentro del POST con los datos: ', req.body);
        
        let result = await users.newUser(req.body);
        console.log("Resultado del alta de usuario", result);
        res.json(result);

    });



    app.get('/getUsers',usersMidd.userAuth, async (req, res) => {
       
        try{
            let result = await users.getUsers();
            
            console.log("Resultado consulta de usuarios usuario ------> ", result);
            res.json(result);
    
        }catch(error){
            console.log("Error al buscar al usuarios");
        }
        
    });    

    app.post('/login', usersMidd.validateUserLogin, async (req, res) =>{
        console.log("dentro del post de login", req.body);
        try {
        let result = await users.userValidate(req.body);
        console.log("Resultado en la vista de login --> ", result);

        if(result != 'El usuario no existe'){
            let id = `${result.userName}` ;

        console.log(`Para el token ====> ${id}`)
        const token = jwt.sign({user:id}, process.env.SECRET_KEY, {
            //expiresIn: process.env.EXP_TOKEN
        });
        console.log("Token generado ", token); 

        const cookiesOptions = {
            expires: new Date(Date.now()+process.env.EXP_COOKIE * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.cookie('session_jwt', token, cookiesOptions);
        res.cookie('user_id', id, cookiesOptions);
            
        res.json({token});
            }else{
                res.send("El usuario no existe favor de validar los datos");
            }
        
        }catch(error){
                console.log("no se pudo generar el token ", error) 
        }  
    });

    app.get('/logout', usersMidd.logout);
}