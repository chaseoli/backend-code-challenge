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
          { $group: { _id: '$id', count: { $sum: 1 } } },
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
    try {
      const p = await db.getById('085')
      expect(p.name).to.be.equal('Dodrio')
    } catch (error) {
      expect(error).to.be.null
    }
  })

  it('should create text search index', async () => {
    try {
      await db.createTextSearchIndex()
      // check if index exists
      // if so, delete it
      // check that it was deleted
      // re-create it
      // check that it was re-created
    } catch (error) {
      expect(error).to.be.null
    }
  })

  it('should get pokemon by exact name', async () => {
    try {
      const p = await db.getByName('Weedle')
      // matched record
      expect(p.match.id).to.be.equal('013')
      // only 1 option back that is equal to exact match
      expect(p.options).to.be.an('array')
      expect(p.options.length).to.be.equal(1)
      expect(p.options[0].id).to.be.equal('013')
    } catch (error) {
      expect(error).to.be.null
    }
  })

  it('should get pokemon approximate options for name', async () => {
    try {
      const p = await db.getByName('wee')
      expect(p.options.length).to.be.equal(3)
      expect(p.match).to.be.empty
      expect(p.options[2].id).to.be.equal('110')
    } catch (error) {
      expect(error).to.be.null
    }
  })

  it('should get all types', async () => {
    try {
      const p = await db.getAllTypes()
      const expected = [
        'Bug',
        'Dragon',
        'Electric',
        'Fairy',
        'Fighting',
        'Fire',
        'Flying',
        'Ghost',
        'Grass',
        'Ground',
        'Ice',
        'Normal',
        'Poison',
        'Psychic',
        'Rock',
        'Steel',
        'Water',
      ]
      expect(p).to.have.members(expected)
    } catch (error) {
      expect(error).to.be.null
    }
  })

  it('should mark as favorite', async () => {})

  it('should get all favorites', async () => {})

  it('should un-mark as favorite', async () => {})

  it('should get paginated results for max qty', async () => {})
})
