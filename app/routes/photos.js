import express from 'express'
import { create, list, remove } from '~/app/services/photos'

const router = express.Router()

/**
 * This shouldn't really be open
 * for testing purpose only
 */

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

router.delete('/', (req, res) => {
  remove(req.body)
    .then(data => res.json(data))
    .catch(e => res.status(500).json(e))
})

module.exports = router
