const dbUsers = require("../db/db.users")
const querys = require('../app/model.users')


module.exports.newUser = async (newUser) => {
    try{
        let model = {

            name: newUser.name,
            lastname: newUser.lastname,
            lastnameM: newUser.lastnameM,
            phone: newUser.phone,
            email: newUser.email,
            userName: newUser.userName,
            pass: newUser.pass
        }

        console.log('modelo a insertar -->  ', model);
        let register = await new dbUsers(model).save();
        return register;

    }catch(error){
    }
}

module.exports.getUsers = async () =>{
    
    try{
        let result = await dbUsers.find({},(err, res) =>{
            //console.log("Resultado de la busqueda ----> ", res);
            return res;
        }).clone();

        console.log("Este es el resultado a devolver ============> ",  result);
        return await result;

    }catch(error){
     console.log("Error al buscar en la bd ", error);   
    }   
}

module.exports.userValidate = async (usr) => {
    console.log("datos a validar === > ", usr)
    try {
        let result = await querys.userExist(usr)
        if (result) {

            console.log("Resultado devuelto login correcto ",result);
            return result;
        } else {
            let error = "El usuario no existe";
            return error;
            
        }
    } catch (err) {
        throw new Error(err)
    }
}

    module.exports.fieldsValidate = (fields) =>{
    //let message = "El campo no contiene un formato correcto --> ";

    let expreg = new RegExp(/[a-z0-9_\-]+(\.[_a-z0-9\-]+)*@([_a-z0-9\-]+\.)+([a-z]{2}|aero|asia|arpa|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx)/);
  
    try {

    
    if(fields.name != ''  &&
    fields.lastname != '' &&
    fields.phone != '' &&
    fields.userName != '' &&
    fields.pass != ''){

         console.log("Datos minimos informados ___> ", fields.name.length, fields.lastname.length, fields.lastnameM.length )
         

        if(typeof fields.name != 'string' || (fields.name).length > 40 || !/^[a-zA-Z]+$/i.test(fields.name)){
            return (`El campo no contiene un formato correcto -->  ${fields.name}`) ;
        }else if(typeof fields.lastname != 'string' || (fields.lastname).length > 40 || !/^[a-zA-Z]+$/i.test(fields.lastname)){
            return (`El campo no contiene un formato correcto -->  ${fields.lastname}`);
        }else if(fields.lastnameM == ''){
             return true;   
        }else if(typeof fields.lastnameM != 'string' || (fields.lastnameM).length > 40 || !/^[a-zA-Z]+$/i.test(fields.lastnameM)){
            return (`El campo no contiene un formato correcto -->  ${fields.lastnameM}`);
        }else if(typeof fields.phone != 'number' || !/^[2-9]{2}[0-9]{8}$/.test(fields.phone)){
            return (`El campo no contiene un formato correcto -->  ${fields.phone}`);
        }else if(fields.email.length > 40 || !/[a-z0-9_\-]+(\.[_a-z0-9\-]+)*@([_a-z0-9\-]+\.)+([a-z]{2}|aero|asia|arpa|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx)/.test(fields.email)){
            return (`El campo no contiene un formato correcto -->  ${fields.email}`);
        }else if(fields.userName.length > 30 || !/^[A-Za-z0-9\s]+$/g.test(fields.userName)
        ){
            return (`El campo no contiene un formato correcto -->  ${fields.userName}`);
        }else if(fields.pass.length > 20){
            return (`El campo no contiene un formato correcto -->  ${fields.pass}`);
        }
        else{
            return true;
        }
    }else if(fields.name == '' ||
                fields.lastname == '' ||
                fields.phone == '' ||
                fields.userName == '' ||
                fields.pass == ''){
                    console.log("Informe todos los campos obligatorios");
                    return ("Faltan datos obligatorios");
            
        }
    }catch(error){
        console.log("No fue posible validar ---> ", error)
        return error;
    }
           
    }

