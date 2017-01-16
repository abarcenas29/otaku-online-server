import express from 'express'
import { create, update } from './../services/users'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({msg: `I'm working`})
})

router.post('/', (req, res) => {
  create(req.body)
    .then(data => res.json(data))
    .catch(e => res.status(500).json(e))
})

router.put('/:id', (req, res) => {
  update({fbid: req.params.id, ...req.body})
    .then(data => res.json(data))
    .catch(e => res.status(500).json(e))
})

module.exports = router
