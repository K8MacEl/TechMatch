var express = require('express');
var router = express.Router();
const projectCtrl = require('../controllers/projects')
//all of these routes are prepended with /customers because of this line in the server.js
//app.use('/projects, projectRouter)

//GET request to /projects
router.get('/', projectCtrl.index)
//GET request to projects/new
router.get('/new', projectCtrl.new)

//GET /projects/:id (show functionality) must be below the new route
router.get('/:projectId',projectCtrl.show)

//POST request to /projects
router.post('/', projectCtrl.create)

//PUT update the project
router.put('/:projectId', projectCtrl.update)

//GET EDIT
router.get('/:projectId/edit',projectCtrl.edit)

//POST the projects for that customer in their show profile
router.post('/customers/:customerId/projects', projectCtrl.addToProfile);

module.exports = router; 