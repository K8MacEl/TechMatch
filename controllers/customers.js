const CustomerModel = require('../models/customer')
// const ProjectModel = require('../models/project')

module.exports = {
    new: newCustomer,
    create,
    index,
    show,
    //delete
}

async function show(req, res){
    try {
        const customerFromTheDB = await CustomerModel.findById(req.params.id)
        console.log(CustomerModel);
        res.render('customers/show', {customer: customerFromTheDB}); //the key customer becomes a varibale name in show.ejs
        } catch (err) {
            console.log(err)
            res.send(err);
        }
}

async function index(req, res){
    //then we want to send an eja page with all the customers to browers
    try {
        const customerDocumentsFromTheDB = await CustomerModel.find({})
        console.log(customerDocumentsFromTheDB)
        res.render('customers/index', {customerDocs: customerDocumentsFromTheDB})
    } catch(err){
        console.log(err)
        res.redirect('/')
    }
}

async function create(req, res){
    try {
        const customerFromTheDB = await CustomerModel.create(req.body);
        console.log(customerFromTheDataBase)
        res.redirect(`/customers/${customerFromTheDB._id}`);
    } catch(err){
        console.log(err);
        res.render('customers/new', {errorMsg: err.message});
    }
}

function newCustomer(req,res){
    res.render('customers/new')
}