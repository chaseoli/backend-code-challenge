import { IPokemon } from '../models/pokemon.model'
import { IGlobal } from '../models/env.model'
declare var global: IGlobal

export class PokemonContext {
  private db = global.mongoClient.db('quantum_pokemon').collection('pokemon')
  async addMany(pokemons: IPokemon[]) {
    this.db.insertMany(pokemons)
  }
}
