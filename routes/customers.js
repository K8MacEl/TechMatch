var express = require('express');
var router = express.Router();
const customerCtrl = require('../controllers/customers')
//all of these routes are prepended with /customers becasue of this line of code in the server.js
//app.use('/customers, customerRouter)

//GET request to /customers
router.get('/', customerCtrl.index)
//get request to /customers/new
router.get('/new', customerCtrl.new)

//GET /customers/:id (show functionality) MUST be below the new route
router.get('/:id', customerCtrl.show)
//POST request to /customers
router.post('/', customerCtrl.create)

module.exports = router;
