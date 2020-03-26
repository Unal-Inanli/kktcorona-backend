const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

const User = new Schema({
    id: ObjectID,
    username: String,
    password: String
})

module.exports = mongoose.model('User', User, 'users')


