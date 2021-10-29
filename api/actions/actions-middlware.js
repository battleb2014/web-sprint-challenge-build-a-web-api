const Actions = require('./actions-model');

async function validateId(req, res, next) {
    const action = await Actions.get(req.params.id);
    try {
        if(!action) {
            res.status(404).json({
                message: 'not found'
            })
        } else {
                req.action = action;
                next();
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding project',
            error: err.message
          })
    }
}

function validateaction(req, res, next) {
    const { description, notes, completed } = req.body;
    if(!description || !description.trim()) {
        res.status(400).json({
            message: 'missing required description field'
        })
    } else if(!notes || !notes.trim()) {
        res.status(400).json({
            message: 'missing required notes field'
        })
    } else if(!completed || !completed.trim()) {
        res.status(400).json({
            message: 'missing required completed field'
        })
    } else {
        req.description = description;
        req.notes = notes;
        req.completed = completed;
        next();
    }
}

module.exports = {
    validateId,
    validateaction
}