require('dotenv').config()
const { DataAccess } = require('../classes/DataAccess');
const User = require('./models/User')

async function getRecord() {
    var dataAccess = new DataAccess();
    const result = await dataAccess.addRecord({username: "unal422", password: "password"}, User)
    return result;
}

exports.getRecord = getRecord;