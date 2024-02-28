const UserModel = require('../models/user')
const ProjectModel = require('../models/project');
const project = require('../models/project');

module.exports = {
    create,
    index,
    new: newProject,
    show,
    // update,
    // edit,
    //delete: deleteOne ----will work on this function next
}

async function show(req, res) {
    try {
        const projectFromTheDB = await ProjectModel.findById(req.params.projectId);
        console.log(projectFromTheDB, "projectsFromTheDB")
        console.log(req.params.projectId, "req.params.projectId");
        res.render('projects/show', { project: projectFromTheDB });
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
        //we want to send an ejs projects/index page to brower
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


// async function edit(req, res) {
//     console.log('------project being edited--------')
    
//     const projectDoc = await ProjectModel.findOne({ _id: req.params.projectId, })
//     res.render('projects/edit', { project: projectDoc });
// }

// async function update(req, res) {
//     //when the edit project form is submitted, the update action will need to find the project 
//     const projectUpdated = await ProjectModel.findOne({ 'projects._id': req.params.id });
//     console.log(projectUpdated, "---PROJECT UPDATED")
//     //find the project using the id method on Mongoose arrays
   
//     //ensure that the project was created by the logged in user
//     console.log("----->red.body", req.body);
//     // if (!projectOwner.customerId.equals(req.user._id)) return res.redirect(`/projects/${project._id}`);
//     //   // Update the text of the comment
//     // //commentSubdoc.text = req.body.text;

//     //update the body of the project form
//     projectUpdated = await ProjectModel.findOneAndUpdate({ '_id': req.params.projectId }, req.body.project);

//     try {
//         await project.save();
//     } catch (err) {
//         console.log(err.message);
//     }
//     //redirect back to the project show view
//     red.redirect(`/projects/show, ${project._id}`)
// }