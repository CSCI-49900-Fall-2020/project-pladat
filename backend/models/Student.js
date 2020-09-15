const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    university: {type: String, required: true},
    internalRank: {type: Number, default: 1},
    swipedRight: [{type: Schema.Types.ObjectId}],
    matched: [{type: Schema.Types.ObjectId}],
    swipedLeft: [{type: Schema.Types.ObjectId}],
    isActive: {type: Boolean, default: false},
    matchProfile: {type: Schema.Types.Mixed, required: true},
    isVerified: {type: Boolean, default: false}
});

module.exports = Student = mongoose.model('Student', StudentSchema);