const express = require('express');
const router = express.Router();

const Actions = require('./actions-router');
const Projects = require('../projects/projects-router');

router.get('/', (req, res, next) => {

})

router.get('/:id', (req, res, next) => {

})

router.post('/', (req, res, next) => {

})

router.put('/:id', (req, res, next) => {

})

router.delete('/:id', (req, res, next) => {

})

router.use((err, req, res) => {
    res.status(err.status || 500).json({
      customMessage: 'something tragic inside posts router happened',
      message: err.message,
      stack: err.stack
    })
  })

  module.exports = router;