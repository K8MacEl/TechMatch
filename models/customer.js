const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//ONE CUSTOMER HAS MANY PROJECTS 
//A PROJECT BELONGS TO A CUSTOMER


const CustomerSchema = new Schema ({

    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: String,
    email: String,
    description: String,
    customerType: String,
    link: String,
    timeZone: String,
    projects: [{
        type: Schema.Types.ObjectId, //this is from Mongoose
        ref: 'Project' //project is referencing the model name that we are creating the relationship with mongoose.model("Project", projectSchema)
    }], 
});


module.exports = mongoose.model('Customer', CustomerSchema)