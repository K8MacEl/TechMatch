const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//the schema enforces the shape of the documents we creat
//A project belongs to A User
//One User may have many projects

const ProjectSchema = new Schema({

projectName: {type: String, required: true, unique: true},
languagesNeeded: String,
budget: Number,
startDate: Date,
endDate: Date,
projectDetails: String,
projectOwner: String, 
projectCustomer: {type: Schema.Types.ObjectId, ref: "Customer"}
})

module.exports = mongoose.model('Project', ProjectSchema)