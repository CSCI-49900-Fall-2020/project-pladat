const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./User');

// const RecruiterSchema = new Schema({
//     firstname: {type: String, required: true},
//     lastname: {type: String, required: true},
//     password: {type: String, required: true},
//     email: {type: String, required: true},
//     company: {type: Schema.Types.ObjectId, required: true, ref: 'Employer'},
//     isVerified: {type: Boolean, default: false},
//     isCompanyVerified: {type: Boolean, default: false},
//     studentMatches: [{type: Schema.Types.ObjectId, ref: 'Student'}],
//     isActive: {type: Boolean, default: false},
//     matchProfile: {type: Schema.Types.Mixed}
// });

const Recruiter = User.discriminator('Recruiter', new Schema({
    education: [{type: String, required: false, defualt: null}],
    jobTitle: {type: String, required: false, defualt: null},
    company: {type: Schema.Types.ObjectId, required: false, ref: 'Employer', defualt: null},
    isCompanyVerified: {type: Boolean, required: false, default: false},
    studentMatches: [{type: Schema.Types.ObjectId, required: false, ref: 'Student', defualt: null}],
    isActive: {type: Boolean, required: false, default: false},
    automatedMatchMsg: {type: String, required: false, defualt: null},
    matchProfile: {type: Schema.Types.Mixed, required: false, defualt: null}
}));

module.exports = mongoose.model('Recruiter');