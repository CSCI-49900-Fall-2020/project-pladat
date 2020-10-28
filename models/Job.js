const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
   title: {type: String, required: true},
   description: {type: String, required: true},
   company: {type: String, required: true, ref: 'Employer'},
   dateOpen: {type: String, default: new Date()},
   location: [{type: String, required: true}],
   todo: {type: String, required: true},
   mustHaveSkills: [{type: String, required: true}],
   recommendSkills: [{type: String, required: false}],
   dateClose: {type: String, required: true},
   internalRank: {type: Number, default: 1},
   matchProfile: {type: Schema.Types.Mixed, required: true},
   swipeRights: [{type: Schema.Types.ObjectId, ref: 'Student'}],
   matchLimit: {type: Number, required: true},
   matches: [{type: Schema.Types.ObjectId, ref: 'Student'}],
   isOpen: {type: Boolean, required: true},
   witnessed: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = Job = mongoose.model('Job', JobSchema);