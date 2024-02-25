const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//ONE CUSTOMER HAS MANY PROJECTS 
//A PROJECT BELONGS TO A CUSTOMER


const CustomerSchema = new Schema ({

    name: String,
    description: String,
    timeZone: String, //make selection options in ejs
    budget: Number,
});


module.exports = mongoose.model('Customer', CustomerSchema)