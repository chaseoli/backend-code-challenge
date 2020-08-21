import { IGlobal } from '../models/env.type'
import { IPerson } from '../models/profile.type'
declare var global: IGlobal

export class UserContext {
  private db = global.mongoClient.db('quantum_pokemon').collection('users')
  async getByUid(id: string): Promise<IPerson> {
    return await this.db.findOne({ id: id })
  }
  async registerUser(uid: string, person: IPerson) {
    // TODO: check that the user does not already exist
    await this.db.insert({
      [uid]: person,
    })
  }
}
