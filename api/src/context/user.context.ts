import { IGlobal } from '../models/env.type'
import { IPerson } from '../models/profile.type'
declare var global: IGlobal

export class UserContext {
  private db = global.mongoClient.db('quantum_pokemon').collection('users')

  /**
   * Gets a user by their firebase uid
   *
   * @param {string} uid
   * @return {*}  {Promise<IPerson>}
   * @memberof UserContext
   */
  async getByUid(uid: string): Promise<IPerson> {
    return await this.db.findOne({ uid: uid })
  }

  /**
   * Creates a new user in the database
   *
   * @param {IPerson} person
   * @return {*}
   * @memberof UserContext
   */
  async register(person: IPerson) {
    // check that the user does not already exist
    const exists = await this.getByUid(person.uid)
    if (!exists) {
      // create user if they don't yet exist
      return await this.db.insertOne(person)
    } else {
      return Promise.reject(`user ${person.email} already exists`)
    }
  }

  /**
   * Delete user by uid
   *
   * @param {string} uid
   * @return {*}
   * @memberof UserContext
   */
  async delete(uid: string) {
    return await this.db.deleteMany({ uid: uid })
  }
}
