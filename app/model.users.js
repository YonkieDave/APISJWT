const dbUser = require('../db/db.users');

    module.exports.userExist = async (usr) => {
        if(typeof usr.id === 'number'){
            let result = dbUser.findOne({ 
                phone: usr.id,
                pass:  usr.pass
            }
            );
            return result;
        }else{
            let result = dbUser.findOne({ 
                email: usr.id,
                pass:  usr.pass
            });
            return result; 
        }
    }

    module.exports.userAuth = async (usr) => {
        console.log("Con estos datos se va a buscar ==> ", usr)

        if(typeof usr.id === 'number'){
            let result = dbUser.findOne({ 
                phone: usr.id,
                pass:  usr.pass
            }
            );
            return result;
        }else{
            let result = dbUser.findOne({ 
                email: usr.id,
                pass:  usr.pass
            });
            return result; 
        }
    }
