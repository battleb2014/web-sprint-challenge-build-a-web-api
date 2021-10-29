const express = require('express');
const router = express.Router();

const Actions = require('./actions-model');

const { validateId, validateaction } = require('./actions-middlware');

router.get('/', async (req, res, next) => {
  try {
    const actions = await Actions.get();
      res.status(201).json(actions)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', validateId, async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    res.status(201).json(action)
  } catch (err) {
    next(err)
  }
})

router.post('/', validateaction, (req, res, next) => {
  Actions.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', validateId, validateaction, async (req, res, next) => {
  try {
    const actionChanges = Actions.update(req.params.id, req.body);
    res.json(actionChanges)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', validateId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(deletedAction => {
      res.json(deletedAction)
    })
    .catch(next)
})

router.use((err, req, res) => {
    res.status(err.status || 500).json({
      customMessage: 'something tragic inside posts router happened',
      message: err.message,
      stack: err.stack
    })
  })

  module.exports = router;