const UserModel = require('../models/user')
const ProjectModel = require('../models/project');
const CustomerModel = require('../models/customer')

module.exports = {
    create,
    index,
    new: newProject,
    show,
    update,
    edit,
    
}


async function show(req, res) {
    try {
        const projectFromTheDB = await ProjectModel.findById(req.params.projectId).populate("projectCustomer");
        //express is changing the ejs into html and sending it to the brower (client side/frontend)
        
        console.log("This is projectsfromtheBD check to see customer--->", projectFromTheDB)
            res.render("projects/show", {
            project: projectFromTheDB, //the key project becomes a variable in the project/show.ejs     
        });

    } catch (err) {
        console.log(err)
        res.send(err);
    }
}

async function create(req, res) {
    //to find the project!
    console.log('====================================')
    console.log(req.body, "< ---- req.body")
    console.log('====================================')
    try {
        const customer = await CustomerModel.findOne({userId: req.user._id})
        req.body.projectCustomer = customer._id
        //req.params.id comes from the http request from the projects show page from the routes/projects route
        const projectDoc = await ProjectModel.create(req.body);
        console.log(projectDoc)
        res.redirect(`/projects/${projectDoc._id}`)

    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

async function index(req, res) {
    try {
        //we want to send an ejs projects/index page to browser
        const projectDocumentsFromTheDB = await ProjectModel.find({})
        console.log(projectDocumentsFromTheDB, 'Project Index router handler called')
        res.render('projects/index', {
            projectDocs: projectDocumentsFromTheDB,
            title: "Project_Index"
        });
    } catch (err) {
        console.log('Error in customer index', err);
        res.status(500).render('error', { error: err });
    }
}

function newProject(req, res) {
    console.log('new project added')
    res.render('projects/new', { title: "Add Project" })

}


async function edit(req, res) {
    console.log('------project being edited--------')
    //want to check to see if the the project is owned by the user
    console.log(req.user._id, "THIS IS req.user._id")
    //if the project is not owned by the user then do not allow edit
    //and redirect back to project/show page
    //if the project is owned by the user then send to edit page
    const projectDoc = await ProjectModel.findOne({ _id: req.params.projectId, })
    res.render('projects/edit', { project: projectDoc });
}

async function update(req, res) {

   
    //ensure that the project was created by the logged in user
    console.log("----->red.body", req.body);


    //update the body of the project form
    projectUpdated = await ProjectModel.findByIdAndUpdate(req.params.projectId, req.body);
    res.redirect(`/projects/${req.params.projectId}`)
 }