import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.json({msg: `I'm working`})
})

module.exports = router
