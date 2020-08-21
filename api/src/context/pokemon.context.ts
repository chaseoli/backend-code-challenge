import { IPokemon, IPokemonTextSearch } from '../models/pokemon.type'
import { IGlobal } from '../models/env.type'
declare var global: IGlobal

export class PokemonContext {
  private db = global.mongoClient.db('quantum_pokemon').collection('pokemon')
  async addMany(pokemons: IPokemon[]) {
    // TODO: should implement a validation check to make
    // sure that the id field is unique
    await this.db.insertMany(pokemons)
  }
  async getById(id: string): Promise<IPokemon> {
    // Query a pokemon by id
    return await this.db.findOne({ id: id })
  }
  async getByName(name: string): Promise<IPokemonTextSearch> {
    // Query a pokemon by exact name
    let match = await this.db.findOne({ name: name })

    let options = []
    if (!match) {
      match = {}
      // if no matching result try a case-insensitive search for options
      // NOTE: While mongo can be searched with a regex
      // this is not recommended and can be slow at scale
      // use collation instead for better performance
      const cursor = this.db
        .find({ name: new RegExp(name, 'i') })
        .collation({ locale: 'en', strength: 2 })
      // const cursor = this.db.find({ $text: { $search: name } })
      options = await cursor.toArray()
    } else {
      // only send back the exact match as option
      options.push(match)
    }

    return {
      match: match,
      options: options,
    }
  }

  async getAllTypes(): Promise<string[]> {
    // Query list of pokemon types
    const types = await this.db.distinct('types')
    return types
  }

  async getFavorites(id: string): Promise<IPokemon[]> {
    // Query list of pokemon types
    // TODO: ...
    return []
  }

  async updateFavorite(id: string, isFavorite: boolean): Promise<void> {
    // Mutation to mark/unmark pokemon as favorite
    // TODO: ...
    return
  }

  async createTextSearchIndex() {
    await this.db.createIndex({ name: 'text' })
    return
  }

  async createUniqueIdIndex() {
    await this.db.createIndex({ id: 1 }, { unique: true })
    return
  }
}
