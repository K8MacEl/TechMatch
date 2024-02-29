const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//ONE CUSTOMER HAS MANY PROJECTS 
//A PROJECT BELONGS TO A CUSTOMER


const CustomerSchema = new Schema ({

    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    description: String,
    customerType: String,
    link: String,
    timeZone: String, 
});


module.exports = mongoose.model('Customer', CustomerSchema)