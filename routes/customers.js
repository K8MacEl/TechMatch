var express = require('express');
var router = express.Router();
const customerCtrl = require('../controllers/customers')
//all of these routes are prepended with /customers becasue of this line of code in the server.js
//app.use('/customers, customerRouter)

//GET request to /customers profile
router.get('/', customerCtrl.index)

//GET request to all customers
router.get('/all', customerCtrl.all)

//get request to /customers/new
router.get('/new', customerCtrl.new)

//GET /customers/:id (show functionality) MUST be below the new route
router.get('/:customerId', customerCtrl.show)
//POST request to /customers
router.post('/', customerCtrl.create)

//DELETE 
router.delete('/:customerId', customerCtrl.delete)


module.exports = router;
