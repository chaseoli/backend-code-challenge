import { describe, it } from 'mocha'
import { expect } from 'chai'
import { Db } from 'mongodb'
import { IGlobal } from '../../models/env.type'
import { UserContext } from '../../context/user.context'
import { IPerson } from '../../models/profile.type'

declare var global: IGlobal

describe('user management', () => {
  let db: UserContext
  let database: Db
  before(async () => {
    // set on global object
    database = global.mongoClient.db('quantum_pokemon')
    db = new UserContext()
  })

  it('database should have the user collection', async () => {
    try {
      const collections = await database.listCollections().toArray()
      const actualCollectionNames = collections.map((obj) => obj.name)
      const expectedCollectionNames = ['users']
      expectedCollectionNames.map((collection) => {
        expect(actualCollectionNames).to.contain(collection)
      })
    } catch (e) {
      expect(e).to.be.null
    }
  })

  const testUid = 'someTestUid'
  const testEmail = 'testemail@somecompany.com'
  it('should create a new user', async () => {
    try {
      const person: IPerson = {
        uid: testUid,
        email: testEmail,
        // profile: {
        //     first: '',
        //     last...
        // }
      }
      await db.register(person)
    } catch (error) {
      expect(error).to.be.null
    }
  })

  it('should get user by id', async () => {
    try {
      const p = await db.getByUid(testUid)
      expect(p.email).to.be.equal(testEmail)
    } catch (error) {
      expect(error).to.be.null
    }
  })

  after(async ()=>{
    await db.delete(testUid)
  })

  it('should mark favorite pokemon for user', async () => {
    
  })

  it('should get all favorite pokemon user', async () => {

  })

  it('should un-mark favorite pokemon for user', async () => {

  })

})
