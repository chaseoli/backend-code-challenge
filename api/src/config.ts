import cors from 'cors'
import express from 'express'
import { IEnv } from './models/env.model'
const helmet = require('helmet')
import * as bodyParser from 'body-parser'
import _ from 'lodash'
import { loadSecrets } from './middleware/secret-manager'
import { startMongo } from './database'

declare var process: {
  env: IEnv
}

export class Config {
  app: express.Application
  private allowedOrigins: string[]
  build: 'prod' | 'dev'

  constructor() {
    // init express app
    this.app = express()

    this.build = process.env.build as 'prod' | 'dev'

    // set origins
    this.setEnv()

    // set cors for specified origins
    // enable selective origins:
    // this.app.use(this.setCorsConfig())
    // enable all origins:
    this.app.use(cors())

    // async loading (eg: load secrets and start db) after first request in middleware
    // this way we only get the secrets when needed after runtime
    // NOTE: we don't retrieve at run time because if we did we
    // would slow the cold start time and slow the build since the
    // app would have to wait to get secrets before booting up completely
    this.app.use(async (req, res, next) => {
      const secretsLoaded = _.get(global, 'secrets_loaded', false)
      // get container secrets from secret manager
      if (!secretsLoaded && process.env.build === 'prod') {
        // update global value denoting that secrets are loaded
        _.set(global, 'secrets_loaded', true)

        // load secrets from secret manager
        await loadSecrets()
      }

      // start the db if not previously started
      const databaseStarted = _.get(global, 'database_started', false)
      if (!databaseStarted) {
        _.set(global, 'database_started', true)
        // start mongo db
        await startMongo()
      }

      next()
    })

    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    this.app.use(bodyParser.json())
  }

  start() {
    // start server and listen on port
    const port = process.env.port || 8080
    this.app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  }

  private setEnv() {
    // setup configs based on build target
    if (process.env.build === 'dev') {
      // Development configurations
      this.devConfig()
    } else {
      // Production configurations
      this.prodConfig()
    }
  }

  private prodConfig() {
    // set basic security related middleware
    // https://expressjs.com/en/advanced/best-practice-security.html
    this.app.use(helmet())

    // view logs to ensure proper deployment
    console.info('===> Running PRODUCTION Configuration <===')

    // cors domains to allow
    this.allowedOrigins = [process.env.portal_url, process.env.portal_url + '/']

    this.app.use((req, res, next) => {
      const allowedOrigins = this.allowedOrigins
      const origin = req.headers.origin as string
      if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin)
      }
      res.header(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST, OPTIONS, DELETE'
      )
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      res.header('Access-Control-Allow-Credentials', 'true')
      return next()
    })
  }

  private devConfig() {
    try {
      this.app.use(
        helmet({
          hsts: false,
        })
      )

      // view logs to ensure proper deployment
      console.info('===> Running DEVELOPMENT Configuration <===')

      // not a production build, so add testing domains to cors
      this.allowedOrigins = [
        // angular app request
        'http://localhost:4200',
        'http://localhost:4200/',

        // express app
        'http://localhost:3000',
        'http://localhost:3000/',

        // google cloud function emulator
        'http://localhost:8010',
        'http://localhost:8010/',
      ]

      this.app.use((req, res, next) => {
        const allowedOrigins = this.allowedOrigins
        const origin = req.headers.origin as string
        if (allowedOrigins.indexOf(origin) > -1) {
          res.setHeader('Access-Control-Allow-Origin', origin)
        }
        res.header(
          'Access-Control-Allow-Methods',
          'GET, PUT, POST, OPTIONS, DELETE'
        )
        res.header(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization'
        )
        res.header('Access-Control-Allow-Credentials', 'true')
        return next()
      })
    } catch (error) {
      console.error(error)
    }
  }

  // private setCorsConfig(): express.RequestHandler {

  //     // https://github.com/expressjs/cors

  //     // set cors configuration for all routes
  //     return cors({
  //         origin: (origin, callback) => {
  //             // allow requests with no origin
  //             // (like mobile apps or curl requests)
  //             if (!origin) {
  //                 return callback(null, true)
  //             }

  //             if (this.allowedOrigins.indexOf(origin) === -1) {
  //                 const msg = 'The CORS policy for this site does not ' +
  //                     'allow access from the specified Origin.'
  //                 return callback(new Error(msg), false)
  //             }

  //             return callback(null, true)
  //         }
  //     })

  // }
}
