
import { expect } from 'chai'
import { IGlobal } from '../../models/env.type'
import { IPerson } from '../../models/user.type'
import { UserContext } from '../../context/user.context'
import { testUid, testEmail } from '../test.constants'
import {DATABASE, USER_COLLECTION} from '../../constants/db.constants'

declare var global: IGlobal

describe('user management', () => {
  let db: UserContext
  before(async () => {
    db = new UserContext()
  })

  it('database should have the user collection', async () => {
    try {
      const collections = await global.mongoClient
        .db(DATABASE)
        .listCollections()
        .toArray()
      const actualCollectionNames = collections.map((obj) => obj.name)
      const expectedCollectionNames = [USER_COLLECTION]
      expectedCollectionNames.map((collection) => {
        expect(actualCollectionNames).to.contain(collection)
      })
    } catch (e) {
      expect(e).to.be.null
    }
  })


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

})
