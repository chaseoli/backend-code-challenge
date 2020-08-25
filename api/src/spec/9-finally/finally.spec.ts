
var expect = require('chai').expect
import { UserContext } from '../../context/user.context'
import { testUid } from '../test.constants'

describe('clean up', () => {
  let userDb: UserContext
  before(async () => {
    userDb = new UserContext()
    // remove temporary test user
    await userDb.delete(testUid)
  })

  it('should removed test user', async () => {
    try {
      // get favorite pokemon for a user
      const testUser = await userDb.getByUid(testUid)
      expect(testUser).to.be.null
    } catch (error) {
      expect(error).to.be.null
    }
  })
})
