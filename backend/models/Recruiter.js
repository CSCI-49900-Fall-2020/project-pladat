const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecruiterSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    company: {type: Schema.Types.ObjectId, required: true, ref: 'Employer'},
    isVerified: {type: Boolean, default: false},
    isCompanyVerified: {type: Boolean, default: false},
    studentMatches: [{type: Schema.Types.ObjectId, ref: 'Student'}],
    isActive: {type: Boolean, default: false},
    matchProfile: {type: Schema.Types.Mixed}
});

module.exports = Recruiter = mongoose.model('Recruiter', RecruiterSchema);