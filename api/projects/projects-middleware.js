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

function validateproject(req, res, next) {
    const { name, description, completed } = req.body;
    if(!name || !name.trim()) {
        res.status(400).json({
            message: 'missing required name field'
        })
    } else if(!description || !description.trim()) {
        res.status(400).json({
            message: 'missing required description field'
        })
    } else {
        req.name = name.trim();
        req.description = description.trim();
        req.completed = completed;
        next();
    }
}

module.exports = {
    validateProjectId,
    validateproject
}