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

const Student = User.discriminator('Student', new Schema({
    university: [{type: String, required: false, defualt: null}],
    major: {type: String, required: false, defualt: null},
    graduationDate: {type: String, required: false, defualt: null},
    shortDesc: {type: String, required: false, defualt: null},
    skills: [{type: String, required: false, defualt: null}],
    socials: {linkedin: String, personalSite: String, otherWeb: Schema.Types.Mixed},
    resume: {type: String, required: false, defualt: null},
    values: {type: Schema.Types.Mixed, required: false, defualt: null},
    internalRank: {type: Number, required: false, default: 1},
    swipedRight: [{type: Schema.Types.ObjectId, defualt: null}],
    matched: [{type: Schema.Types.ObjectId, required: false, default: true}],
    swipedLeft: [{type: Schema.Types.ObjectId, required: false, default: true}],
    matchProfile: {type: Schema.Types.Mixed, required: false, defualt: null},
    preferredRoles: [{type: String, required: false, default: null}],
    generalExperience: [{type: String, required: false, defualt: null}]
}))

module.exports = mongoose.model('Student');