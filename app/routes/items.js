import express from 'express'
import { create, update, list, remove } from '~/app/services/items'

const router = express.Router()

router.get('/', (req, res) => {
  list(req.query)
    .then(data => res.json(data))
    .catch(e => res.status(500).json(e))
})

router.post('/', (req, res) => {
  create(req.body)
    .then(data => res.json(data))
    .catch(e => {
      res.status(500).json(e)
    })
})

router.put('/:id', (req, res) => {
  update({id: req.params.id, ...req.body})
    .then(data => res.json(data))
    .catch(e => res.status(500).json(e))
})

router.delete('/:id', (req, res) => {
  remove(req.params.id)
    .then(data => res.json(data))
    .catch(e => res.status(500).json(e))
})

module.exports = router
