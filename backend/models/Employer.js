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

const EmployerSchema = User.discriminator('Employer', new Schema({
    companyName: {type: String, required: true},
    industry: {type: String, required: true},
    companyGrowthStage: {type: String, required: true},
    approxNumEmployees: {type: String, required: true},
    location: {type: String, required: true},
    yearFounded: {type: String, required: true},
    socials: {linkedin: String, twitter: String, insta: String, otherWeb: Schema.Types.Mixed},
    activeListed: [{type: Schema.Types.ObjectId, ref: 'Job'}],
    recruiters: [{type: Schema.Types.ObjectId, ref: 'Recruiter'}],
    internalRank: {type: Number, default: 1},
    matchProfile: {type: Schema.Types.Mixed, required: true},
    isVerifiedCompany: {type: Boolean, default: false}
}))

module.exports = Employer = mongoose.model('Employer', EmployerSchema);