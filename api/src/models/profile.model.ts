import { IPerson, IPersonProfile } from './profile.type'
import _ from 'lodash'
import { UserContext } from '../context/user.context'
import * as err from '../err'

class PersonProfile {
  model: IPersonProfile

  constructor() {
    this.model = {
      first: '',
      nickname: '',
      middle: '',
      last: '',
      phone: '',
      mobile: '',
      email: '',
      country: '',
      mailingAddress: '',
      lat: '',
      lon: '',
    }
  }
}

export class Person {
  model: IPerson
  private db = new UserContext()

  constructor() {
    const person = new PersonProfile().model

    this.model = {
      uid: '',
      profile: person,
    }
  }

  async setByUid(uid: string) {
    this.model = await this.db.getByUid(uid)
  }

  /**
   * Creates a new user profile in the system via firebase authentication
   *
   * @param {string} uid
   * @param {(string | undefined)} [email]
   * @returns {Promise<string[]>}
   * @memberof Person
   */
  async register(
    uid: string,
    email?: string | undefined
  ): Promise<IPerson> {
    try {
      // update profile fields for db
      this.model.profile.email = email as string
      this.model.uid = uid

      // save person to stellar as new user profile
      await this.db.registerUser(uid, this.model)

      return this.model
    } catch (error) {
      const msg = `failed to complete registration setup for new user email:${email} uid: ${uid}`
      const e = new err.DatabaseError(msg, error)
      return Promise.reject(e.message)
    }
  }
}
