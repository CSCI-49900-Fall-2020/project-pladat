const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseOptions = {
    discriminatorKey: "typeOfUser",
    collection: 'users'
}

const GeneralUser = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: false},
    email: {type: String, requried: true},
    isActive: {type: Boolean, default: false},
    password: {type: String, required: true},
    isVerified: {type: Boolean, default: false},
    typeOfUser: {type: String, required: true},
    infoComplete: {type: Boolean, default: false} 
}, baseOptions);

module.exports = User = mongoose.model('User', GeneralUser);