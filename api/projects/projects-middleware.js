const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id);
        if(!project) {
            next({
                status: 404,
                message: 'not found'
            })
        } else {
         req.project = project;
         next();
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding project',
            error: err.message
          })
    }
}

function validateProject(req, res, next) {
    const project = req.body;
    if(!project.name || !project.description) {
        res.status(400).json({
            message: 'missing required name and description'
        })
    } else {
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProject
}