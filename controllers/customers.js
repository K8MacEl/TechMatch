const CustomerModel = require('../models/customer')
const ProjectModel = require('../models/project')

module.exports = {
    new: newCustomer,
    create,
    index,
    show,
    delete: deleteOne
}

async function deleteOne(req, res){
    try {
        await CustomerModel.deleteOne({_id: req.params.customerId});
    
       
       //delete the cutsomer from the CustomerModel
       //redirect after deletion
        res.redirect('/customers');//change the redirect path as desired/needed
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}



async function index(req, res) {
    //then we want to send an eja page with all the customers to browers
    try {
        const customerDocumentsFromTheDB = await CustomerModel.find({})
        console.log(customerDocumentsFromTheDB)
        res.render('customers/index', {
            customerDocs: customerDocumentsFromTheDB,
            title: 'Customers List'

        });
    } catch (err) {
        console.log('Error in customer index', err);
        res.status(500).render('error', { error: err });
    }
}

async function create(req, res) {
    //To find the user
    console.log('====================================')
    console.log(req.body, '<-------req.body')
    console.log('====================================')
    try {
        
        
        req.body.userId = req.user._id
        
        const customerDocumentsFromTheDB = await CustomerModel.create(req.body);
        console.log(customerDocumentsFromTheDB)
        res.redirect(`/customers/${customerDocumentsFromTheDB._id}`)

    } catch (err) {
        console.log(err);
        res.render("customers/new", {errorMsg: err.message});
    }
}

function newCustomer(req, res) {
    console.log('new user added')
    res.render('customers/new', { title: "Add User" });
}

async function show(req, res) {
    try {
        const customerFromTheDB = await CustomerModel.findById(req.params.customerId)
        console.log(customerFromTheDB);
        if (!customerFromTheDB){
            return res.status(404).render('Customer profile not found."');
        }
         res.render('customers/show', { customer: customerFromTheDB });
         //the key customer becomes a varibale name in show.ejs
         //res.redirect(`/customers/${customerDoc._id}`)
    } catch (err) {
        console.log(err, "cant get to customer show page")
        res.send(err);
    }
}