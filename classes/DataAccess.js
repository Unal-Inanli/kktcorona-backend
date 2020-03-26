const mongoose = require('mongoose');
require('dotenv').config()


class DataAccess {
    constructor() {
    }

    async findOne(query, collection) {
        return await mongoose.connection.db.collection(collection).findOne(query)
    }

     async addRecord(data, Model) {
        
        var model = new Model(data); 
        
        model.save((err) => {
            if (err) {
                return false;
            }
        })

        return true;
    }

}

exports.DataAccess = DataAccess