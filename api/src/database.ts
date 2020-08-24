import { MongoClient } from 'mongodb'
import { DatabaseError } from './err'
import { IGlobal } from './models/env.type'

declare var global: IGlobal

export const startMongo = async () => {
  const client = MongoClient.connect(
    process.env.db_uri,
    // TODO: Connection Pooling
    // Set the poolSize to 50 connections.
    // TODO: Timeouts
    // Set the write timeout limit to 2500 milliseconds.
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  client.catch((err) => {
    // log the error
    new DatabaseError('failed to initialize database', err)
  })
  global.mongoClient = await client
}
