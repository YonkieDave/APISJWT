const {Schema, model} = require('mongoose');

const usersSchema = new Schema({
    name: String,
    lastname: String,
    lastnameM: String,
    phone: Number,
    email: String,
    userName: String,
    pass: String
},
{
    timestamps: true
});

 
module.exports = model('users',usersSchema);

