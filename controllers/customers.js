const CustomerModel = require('../models/customer')
const ProjectModel = require('../models/project')

module.exports = {
    new: newCustomer,
    create,
    index,
    show,
    delete: deleteOne,
    all: allCustomers,
}

async function deleteOne(req, res) {
    try {
        await CustomerModel.deleteOne({ _id: req.params.customerId });


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
        async function create(req, res) {
            //To find the user
            console.log('====================================')
            console.log(req.body, '<-------req.body')
            console.log('====================================')
            try {
        
        
                req.body.userId = req.user._id
                // YOU CAN ADD THIS LINE
                console.log(req.user)
                req.body.name = req.user.name
                const customerDocumentsFromTheDB = await CustomerModel.create(req.body);
                console.log(customerDocumentsFromTheDB)
                res.redirect(`/customers/${customerDocumentsFromTheDB._id}`)
        
            } catch (err) {
                console.log(err);
                res.render("customers/new", { errorMsg: err.message });
            }
        }
        const customerDocumentsFromTheDB = await CustomerModel.create(req.body);
        console.log(customerDocumentsFromTheDB)
        res.redirect(`/customers/${customerDocumentsFromTheDB._id}`)

    } catch (err) {
        console.log(err);
        res.render("customers/new", { errorMsg: err.message });
    }
}

async function newCustomer(req, res) {
    console.log('new user added')
    //main goal is to check to see if a user has already created a customer
    //if user has created a customer then we want to prevent them from accessing this view

    //1. make sure we have a logged in user and can access user id 
    console.log(req.user._id, "THIS IS req.user._id")
    //2. we have user id now we can query or search db for a customer with userId
    const existingCustomer = await CustomerModel.findOne({ 'userId': req.user._id });
    //3.If we find a customer 
    if (existingCustomer) {
        //redirect user to the customer show page
        res.redirect(`/customers/${existingCustomer._id}`);
    }
    //4. else render the view
    else {
        res.render('customers/new', { title: "Add User" });
    }
}

async function show(req, res) {
    try {
        const customerFromTheDB = await CustomerModel.findById(req.params.customerId)
        console.log(customerFromTheDB);
        if (!customerFromTheDB) {
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


async function allCustomers(req, res) {
    try {
        //I want to send an ejs customers/all page to browers
        const allCustomersFromTheDB = await CustomerModel.find({})
        //check this is working
        console.log(allCustomersFromTheDB, '<---these are all the customers in Mongoose')
        res.render('customers/all', {
            allProfiles: allCustomersFromTheDB,
            title: "All_Customers"
        });
    } catch (err) {
        console.log('Error in customer all', err);
        res.status(500).render('error', { error: err });

    }
}

   