const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./User');

// const StudentSchema = new Schema({
//     firstname: {type: String, required: true},
//     lastname: {type: String, required: true},
//     password: {type: String, required: true},
//     email: {type: String, required: true},
//     university: {type: String, required: true},
//     internalRank: {type: Number, default: 1},
//     swipedRight: [{type: Schema.Types.ObjectId}],
//     matched: [{type: Schema.Types.ObjectId}],
//     swipedLeft: [{type: Schema.Types.ObjectId}],
//     isActive: {type: Boolean, default: false},
//     matchProfile: {type: Schema.Types.Mixed, required: true},
//     isVerified: {type: Boolean, default: false}
// });

const StudentSchema = User.discriminator('Student', new Schema({
    university: [{type: String, required: true}],
    major: {type: String, required: true},
    graduationDate: {type: String, required: true},
    shortDesc: {type: String, required: true},
    skills: [{type: String, required: false}],
    socials: {linkedin: String, personalSite: String, otherWeb: Schema.Types.Mixed},
    resume: {type: String, required: false},
    values: {type: Schema.Types.Mixed, required: false},
    internalRank: {type: Number, default: 1},
    swipedRight: [{type: Schema.Types.ObjectId}],
    matched: [{type: Schema.Types.ObjectId}],
    swipedLeft: [{type: Schema.Types.ObjectId}],
    matchProfile: {type: Schema.Types.Mixed, required: true},
}))

module.exports = Student = mongoose.model('Student', StudentSchema);