const express = require('express');
const router = express.Router();

const Projects = require('./projects-model');
const Actions = require('../actions/actions-model');

const { validateProjectId, validateProject } = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch(next)
})
router.get('/:id', validateProjectId, async (req, res, next) => {
    try {
        res.json(req.project)
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try{
        const actions = await Projects.getProjectActions(req.params.id);
        res.json(actions)
    } catch (err) {
        next(err)
    }
})

router.post('/', validateProject, (req, res, next) => {
        Projects.insert(req.body)
            .then(({ id }) => {
                return Projects.get(id)
            })
            .then(newProject => {
                res.status(201).json(newProject)
            })
            .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(updatedProject => {
            res.json(updatedProject)
        })
        .catch(next)
})

router.delete('/:id/actions', validateProjectId, (req, res, next) => {
    const actions = Actions.getProjectActions(req.params.id);
    Projects.remove(actions)
        .then(deletedProject => {
            res.json(deletedProject)
        })
        .catch(next)
})

router.use((err, req, res) => {
    res.status(err.status || 500).json({
      customMessage: 'something tragic inside projects router happened',
      message: err.message,
      stack: err.stack
    })
  })

  module.exports = router;