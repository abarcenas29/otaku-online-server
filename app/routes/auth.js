import express from 'express'
import { verify } from '~/app/services/auth'

const router = express.Router()

router.post('/verify', (req, res) => {
  verify(req.body)
    .then(payload => {
      // set the access token to fb
      // req.session.access_token = payload.response.fbRes.access_token
      res.json(payload)
    })
    .catch(e => res.status(500).json(e))
})

// debug route
router.post('/debug', (req, res) => {
  res.json(req.session)
})

export default router
