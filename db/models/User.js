const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

const User = new Schema({
    id: ObjectID,
    username: String,
    password: String,
    hasProfile: {type: Boolean, default: false},
    isVolunteer: {type: Boolean, default: false},
    emailConfirmed: {type: Boolean, default: false},
    userProfile: {
        FirstName: String,
        LastName: String,
        Bio: String,
    }
})

module.exports = mongoose.model('User', User, 'users')


