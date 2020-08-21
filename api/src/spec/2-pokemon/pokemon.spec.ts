import { describe, it } from 'mocha'
import { expect } from 'chai'
import { Db } from 'mongodb'
import { IGlobal } from '../../models/env.model'
import { PokemonContext } from '../../context/pokemon.context'

declare var global: IGlobal

describe('MongoClient', () => {
  let db: PokemonContext
  let database: Db
  before(async () => {
    // set on global object
    database = global.mongoClient.db('quantum_pokemon')
    db = new PokemonContext()
  })

  it('database should have the pokemon collection', async () => {
    try {
      const collections = await database.listCollections().toArray()
      const actualCollectionNames = collections.map((obj) => obj.name)
      const expectedCollectionNames = ['pokemon']
      expectedCollectionNames.map((collection) => {
        expect(actualCollectionNames).to.contain(collection)
      })
    } catch (e) {
      expect(e).to.be.null
    }
  })

  it('database should have a specific amount of records', async () => {
    try {
      const movies = database.collection('pokemon')

      const numMoves = await movies.countDocuments({})
      expect(numMoves).to.be.equal(151)
    } catch (e) {
      expect(e).to.be.null
    }
  })

  it('records should have unique ids', async () => {
    try {
      const cursor = database
        .collection('pokemon')
        .aggregate([
          { $group: {  _id: '$id', count: { $sum: 1 } } },
          { $match: { count: { $gt: 1 } } },
        ])

      const clashingIds = await cursor.toArray()

      expect(clashingIds).to.be.an('array')
      expect(clashingIds.length).to.be.equal(0)
    } catch (error) {
      expect(error).to.be.null
    }
  })

  it('should get pokemon by id', async () => {
    const p = await db.getById('085')
    expect(p.name).to.be.equal('Dodrio')
  })

  it('should get pokemon by exact name', async () => {})

  it('should get pokemon approximate options for name', async () => {})

  it('should get all types', async () => {})

  it('should mark as favorite', async () => {})

  it('should get all favorites', async () => {})

  it('should un-mark as favorite', async () => {})

  it('should get paginated results for max qty', async () => {})
})
