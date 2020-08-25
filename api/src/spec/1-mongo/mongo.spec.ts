import 'mocha'
import { expect } from 'chai'
import { MongoClient } from 'mongodb'
import { IGlobal } from '../../models/env.type'
import { startMongo } from '../../database'

declare var global: IGlobal

interface IMongoClientWithOptions extends MongoClient {
  s: {
    options: any
  }
}

describe('MongoClient', () => {
  let client: IMongoClientWithOptions
  before(async () => {
    // connect the db
    await startMongo()
    // set on global object
    client = global.mongoClient as IMongoClientWithOptions
  })

  it('should initialize mongo with client', async () => {
    try {
      expect(client).not.to.be.null
      // retrieve client options
      const clientOptions = client.s.options
      // console.error("OPTS", clientOptions)
      expect(clientOptions).not.to.be.undefined

      // expect this connection to have SSL enabled
      if (typeof clientOptions.ssl !== 'undefined') {
        expect(clientOptions).to.have.property('ssl')
        expect(clientOptions.ssl).to.be.true

        // expect this user to authenticate against the "admin" database
        expect(clientOptions).to.have.property('authSource')
        expect(clientOptions.authSource).to.be.equal('admin')
      }
    } catch (e) {
      expect(e).to.be.null
    }
  })
})
