const express = require('express');
const router = express.Router();

const Projects = require('./projects-model');
const Actions = require('../actions/actions-router');

const { validateProjectId } = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
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

router.get('/:id/actions', validateProjectId, (req, res, next) => {

})

router.post('/', (req, res, next) => {

})

router.put('/:id', validateProjectId, (req, res, next) => {

})

router.delete('/:id/actions', validateProjectId, (req, res, next) => {

})

router.use((err, req, res) => {
    res.status(err.status || 500).json({
      customMessage: 'something tragic inside posts router happened',
      message: err.message,
      stack: err.stack
    })
  })

  module.exports = router;