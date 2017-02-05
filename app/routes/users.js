import express from 'express'
import passport from 'passport'
import { create, update, list } from '~/app/services/users'

const router = express.Router()

router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // passed by the jwt authenticate
    const { role } = req.user
    if (parseInt(role) === 1) {
      list(req.query)
        .then(data => res.json(data))
        .catch(e => res.status(500).json(e))
    } else {
      res.status(403).end()
    }
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
