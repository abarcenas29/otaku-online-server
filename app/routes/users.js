import express from 'express'
import { create, update, list } from '~/app/services/users'

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
  update({set: {...req.body}, where: {fbid: req.params.id}})
    .then(data => res.json(data))
    .catch(e => res.status(500).json(e))
})

module.exports = router
