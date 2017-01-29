import os from 'os'
import express from 'express'
import cluster from 'cluster'
import bodyParser from 'body-parser'
import session from 'express-session'
import pgSimple from 'connect-pg-simple'
import cors from 'cors'
import compression from 'compression'

// Routes
import Anilist from './routes/anilist'
import Auth from './routes/auth'
import Items from './routes/items'
import Options from './routes/options'
import Photos from './routes/photos'
import Users from './routes/users'

if (cluster.isMaster) {
  const numWorkers = os.cpus().length
  console.log(`VPN has ${numWorkers} setup`)

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork()
  }

  cluster.on('online', worker => {
    console.log(`Worker ${worker.process.pid} is online`)
  })

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with ${code} and signal : ${signal}`)
    console.log('Starting a new worker')
    cluster.fork()
  })
} else {
  const app = express()

  /**
   * Middlewares
  **/
  app.use(cors({
    origin: [
      'http://otaku.website.local:3000',
      'https://shop.otaku.website'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }))
  app.use(compression())

  // Read JSON
  app.use(bodyParser.json({limit: '50mb'}))
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

  // Session
  app.use(session({
    store: new (pgSimple(session))(),
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000}, // 7 days
    saveUninitialized: false, // deprecated set to false to comply
    resave: false
  }))

  // Routes
  app.use('/anilist', Anilist)
  app.use('/auth', Auth)
  app.use('/items', Items)
  app.use('/options', Options)
  app.use('/photos', Photos)
  app.use('/users', Users)

  app.listen(9000, () => {
    console.log(`Process ${process.pid} is listening to all incoming request.`)
  })
}
