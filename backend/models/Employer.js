const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./User');

// const EmployerSchema = new Schema({
    // companyName: {type: String, required: true},
    // activeListed: [{type: Schema.Types.ObjectId, ref: 'Job'}],
    // recruiters: [{type: Schema.Types.ObjectId, ref: 'Recruiter'}],
    // internalRank: {type: Number, default: 1},
    // profile: {type: Schema.Types.Mixed, required: true},
    // isVerified: {type: Boolean, default: false}
// });

const Employer = User.discriminator('Employer', new Schema({
    companyName: {type: String, required: false, defualt: null},
    industry: {type: String, required: false, defualt: null},
    companyGrowthStage: {type: String, required: false, defualt: null},
    approxNumEmployees: {type: String, required: false, defualt: null},
    location: {type: String, required: false, defualt: null},
    yearFounded: {type: String, required: false, defualt: null},
    socials: {linkedin: String, twitter: String, insta: String, otherWeb: Schema.Types.Mixed},
    activeListed: [{type: Schema.Types.ObjectId, required: false, ref: 'Job', defualt: null}],
    recruiters: [{type: Schema.Types.ObjectId, required: false, ref: 'Recruiter', defualt: null}],
    internalRank: {type: Number, required: false, default: 1},
    matchProfile: {type: Schema.Types.Mixed, required: false, defualt: null},
    isVerifiedCompany: {type: Boolean, required: false, default: false}
}))

module.exports = mongoose.model('Employer');