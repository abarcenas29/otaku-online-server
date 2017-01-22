import express from 'express'
import { list } from '~/app/services/anilist'

const router = express.Router()

router.get('/', (req, res) => {
  list(req.query)
    .then(data => res.json(data))
    .catch(e => res.status(500).json(e))
})

module.exports = router
