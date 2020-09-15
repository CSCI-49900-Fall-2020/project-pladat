const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployerSchema = new Schema({
    companyName: {type: String, required: true},
    activeListed: [{type: Schema.Types.ObjectId, ref: 'Job'}],
    recruiters: [{type: Schema.Types.ObjectId, ref: 'Recruiter'}],
    internalRank: {type: Number, default: 1},
    profile: {type: Schema.Types.Mixed, required: true},
    isVerified: {type: Boolean, default: false}
});

module.exports = Employer = mongoose.model('Employer', EmployerSchema);