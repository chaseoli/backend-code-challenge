import { IPokemon, IPokemonTextSearch } from '../models/pokemon.type'
import { IGlobal } from '../models/env.type'
// import { IPerson } from '../models/profile.type'
declare var global: IGlobal

export class PokemonContext {
  private db = global.mongoClient.db('quantum_pokemon').collection('pokemon')
  async addMany(pokemons: IPokemon[]) {
    // TODO: should implement a validation check to make
    // sure that the id field is unique
    await this.db.insertMany(pokemons)
  }
  /**
   * Query a pokemon by id
   *
   * @param {string} id
   * @return {*}  {Promise<IPokemon>}
   * @memberof PokemonContext
   */
  async getById(id: string): Promise<IPokemon> {
    return await this.db.findOne({ id: id })
  }

  /**
   * Query a pokemon by exact name
   *
   * @param {string} name
   * @return {*}  {Promise<IPokemonTextSearch>}
   * @memberof PokemonContext
   */
  async getByName(name: string): Promise<IPokemonTextSearch> {
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

  /**
   * Query list of pokemon types
   *
   * @return {*}  {Promise<string[]>}
   * @memberof PokemonContext
   */
  async getAllTypes(): Promise<string[]> {
    const types = await this.db.distinct('types')
    return types
  }

  async filterAll(
    limit: number,
    skip: number,
    name?: string,
    types?: string[],
    favoritesIdArray?: string[]
  ): Promise<IPokemon[]> {
    let query = []

    // only select from user's favorites
    if (favoritesIdArray) {
      if (favoritesIdArray.length > 0) {
        query.push({
          $match: {
            id: {
              $in: favoritesIdArray,
            },
          },
        })
      }
    }

    // sort by id to ensure order
    query.push({
      $sort: {
        id: 1,
      },
    })

    // filter by exact or approximate names
    if (name) {
      query.push({
        $match: {
          name: new RegExp(name, 'i'),
        },
      })
    }

    // filter by exact type
    if (types) {
      query.push({
        $match: {
          types: {
            $in: types,
          },
        },
      })
    }

    // paginate by 'limiting' results and thereafter 'skipping' previously retrieved results
    query.push({
      $limit: limit,
    })
    query.push({
      $skip: skip,
    })

    const cursor = this.db.aggregate(query)
    const results = await cursor.toArray()
    return results
  }

  /**
   * Query list of pokemon types
   *
   * @param {string} id
   * @return {*}  {Promise<IPokemon[]>}
   * @memberof PokemonContext
   */
  async getFavorites(favoritesIdArray: string[]): Promise<IPokemon[]> {
    const cursor = this.db.aggregate([
      {
        $match: {
          id: {
            $in: favoritesIdArray,
          },
        },
      },
    ])
    return await cursor.toArray()
  }


  /**
   * Mark pokemon as favorite for user
   *
   * @param {string} uid
   * @param {string} pokemonId
   * @param {boolean} isFavorite
   * @return {*}  {Promise<void>}
   * @memberof PokemonContext
   */
  async updateFavorite(
    uid: string,
    pokemonId: string,
    isFavorite: boolean
  ): Promise<void> {
    if (isFavorite) {
      // add to favorites
      await this.db.update(
        { uid: uid },
        // { pokemonId: pokemonId } might seem odd, but this is a trick
        // for marking favorites at scale.
        // See discussion at "../models/profile.type", pokemon_favorites
        { $set: { [pokemonId]: pokemonId } }
      )
    } else {
      // remove from favorites
      await this.db.update(
        { uid: uid },        
        { $unset: { [pokemonId]: '' } }
      )
    }
    return
  }

  // async createTextSearchIndex() {
  //   await this.db.createIndex({ name: 'text' })
  //   return
  // }

  // async createUniqueIdIndex() {
  //   await this.db.createIndex({ id: 1 }, { unique: true })
  //   return
  // }
}
