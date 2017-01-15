import os from 'os'
import express from 'express'
import cluster from 'cluster'
import bodyParser from 'body-parser'
import path from 'path'
import fs from 'fs'

// Routes
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

  // Read JSON
  app.use(bodyParser.json())

  // Routes
  app.use('/users', Users)

  app.listen(9000, () => {
    console.log(`Process ${process.pid} is listening to all incoming request.`)
  })
}
