const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;
const User = require('./User');


const Recruiter = User.discriminator('Recruiter', new Schema({
    education: [{type: String, required: false, defualt: null}],
    jobTitle: {type: String, required: false, defualt: null},
    company: {type: Schema.Types.ObjectId, required: false, ref: 'Employer', defualt: null},
    isCompanyVerified: {type: Boolean, required: false, default: false},
    studentMatches: [{type: Schema.Types.ObjectId, required: false, ref: 'Student', defualt: null}],
    isActive: {type: Boolean, required: false, default: false},
    automatedMatchMsg: {type: String, required: false, defualt: null},
    matchProfile: {type: Schema.Types.Mixed, required: false, defualt: null},
    shortDesc: {type: String, required: false, default: null},
    socials: {linkedin: String, personalSite: String, otherWeb: Schema.Types.Mixed},
    internalRank: {type: Number, required: false, default: 1},
    swipedLeft: [{type: Schema.Types.ObjectId, required: false, default: true}],
    swipedRight: [{type: Schema.Types.ObjectId, defualt: null}],
}));

module.exports = mongoose.model('Recruiter');