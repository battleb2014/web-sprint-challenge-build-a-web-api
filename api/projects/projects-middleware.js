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

module.exports = {
    validateProjectId
}