
import { expect } from 'chai'
import { Db } from 'mongodb'
import { IGlobal } from '../../models/env.type'
import { PokemonContext } from '../../context/pokemon.context'
import { testUid } from '../test.constants'
import { DATABASE, POKEMON_COLLECTION } from '../../constants/db.constants'

declare var global: IGlobal

describe('pokemon data', () => {
  let db: PokemonContext
  let database: Db
  before(async () => {
    // set on global object
    database = global.mongoClient.db(DATABASE)
    db = new PokemonContext()
  })

  it('database should have the pokemon collection', async () => {
    try {
      const collections = await database.listCollections().toArray()
      const actualCollectionNames = collections.map((obj) => obj.name)
      const expectedCollectionNames = [POKEMON_COLLECTION]
      expectedCollectionNames.map((collection) => {
        expect(actualCollectionNames).to.contain(collection)
      })
    } catch (e) {
      expect(e).to.be.null
    }
  })

  it('database should have a specific amount of records', async () => {
    try {
      const collection = database.collection('pokemon')

      const num = await collection.countDocuments({})
      expect(num).to.be.equal(151)
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

  //   it('should create text search index', async () => {
  //     try {
  //       await db.createTextSearchIndex()
  //       // check if index exists
  //       // if so, delete it
  //       // check that it was deleted
  //       // re-create it
  //       // check that it was re-created
  //     } catch (error) {
  //       expect(error).to.be.null
  //     }
  //   })

  //   it('should create unique index for ids', async () => {
  //     try {
  //       await db.createUniqueIdIndex()
  //       // TODO: ...
  //       // check if index exists
  //       // if so, delete it
  //       // check that it was deleted
  //       // re-create it
  //       // check that it was re-created
  //     } catch (error) {
  //       expect(error).to.be.null
  //     }
  //   })

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
      expect(p.match).to.be.null
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

  it('should paginate results', async () => {
    try {
      const startAtIdx = 10
      const take = 5
      const p = await db.filterAll(startAtIdx + take, startAtIdx)
      expect(p).to.be.an('array')
      expect(p.length).to.be.equal(5)
      expect(p[2].name).to.be.equal('Weedle')
    } catch (error) {
      expect(error).to.be.null
    }
  })

  it('should perform advanced query results', async () => {
    try {
      const favorites = ['001', '009', '012', '015', '069']
      const startsWith = 'b'
      const types = ['Poison', 'Bug', 'Water']
      const limit = 10
      const skip = 3

      const p = await db.filterAll(limit, skip, startsWith, types, favorites)
      expect(p).to.be.an('array')
      expect(p.length).to.be.equal(2)
      expect(p[1].name).to.be.equal('Bellsprout')
    } catch (error) {
      expect(error).to.be.null
    }
  })

  const favoritesIdArr = ['013', '045', '023', '083']
  it('should mark favorite pokemon for user', async () => {
    try {
      const promiseArr = []

      for (const i of favoritesIdArr) {
        // add favorites one at a time to user
        promiseArr.push(db.updateFavorite(testUid, i, true))
      }

      // execute writes in parallel
      await Promise.all(promiseArr)
    } catch (error) {
      expect(error).to.be.null
    }
  })

  it('should get all favorite pokemon user', async () => {
    try {
      // get favorite pokemon for a user
      const favorites = await db.getFavorites(testUid)
      for (const i of favorites) {
        // expect the pokemon id to be included in the favorites array
        expect(favoritesIdArr).to.contain(i.id)
      }
    } catch (error) {
      expect(error).to.be.null
    }
  })

  it('should un-mark favorite pokemon for user', async () => {
    try {
      const promiseArr = []

      for (const i of favoritesIdArr) {
        // remove favorites one at a time to user
        promiseArr.push(db.updateFavorite(testUid, i, false))
      }

      // execute writes in parallel
      await Promise.all(promiseArr)
    } catch (error) {
      expect(error).to.be.null
    }
  })

  it('should not contain any favorite pokemon', async () => {
    try {
      // get favorite pokemon for a user
      const favorites = await db.getFavorites(testUid)
      expect(favorites).to.be.an('array')
      expect(favorites.length).to.be.equal(0)
    } catch (error) {
      expect(error).to.be.null
    }
  })
})
