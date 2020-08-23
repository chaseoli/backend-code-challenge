import {
  IPokemon,
  IPokemonTextSearch
} from '../models/pokemon.type'
import { IGlobal } from '../models/env.type'
import * as _ from 'lodash'
import {
  DATABASE,
  USER_COLLECTION,
  POKEMON_COLLECTION,
} from '../constants/db.constants'
import { IPerson } from '../models/user.type'

declare var global: IGlobal

export class PokemonContext {
  private pokemonDb = global.mongoClient
    .db(DATABASE)
    .collection(POKEMON_COLLECTION)
  private userDb = global.mongoClient.db(DATABASE).collection(USER_COLLECTION)
  async addMany(pokemons: IPokemon[]) {
    // TODO: should implement a validation check to make
    // sure that the id field is unique
    await this.pokemonDb.insertMany(pokemons)
  }
  /**
   * Query a pokemon by id
   *
   * @param {string} id
   * @return {*}  {Promise<IPokemon>}
   * @memberof PokemonContext
   */
  async getById(id: string): Promise<IPokemon> {
    return await this.pokemonDb.findOne<IPokemon>({ id: id })
  }

  /**
   * Query a pokemon by exact name
   *
   * @param {string} name
   * @return {*}  {Promise<IPokemonTextSearch>}
   * @memberof PokemonContext
   */
  async getByName(name: string): Promise<IPokemonTextSearch> {
    let match = await this.pokemonDb.findOne<IPokemon>({ name: name })

    let options = []
    if (!match) {
      match = null
      // if no matching result try a case-insensitive search for options
      // NOTE: While mongo can be searched with a regex
      // this is not recommended and can be slow at scale
      // use collation instead for better performance
      const cursor = this.pokemonDb
        .find<IPokemon[]>({ name: new RegExp(name, 'i') })
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
    const types = await this.pokemonDb.distinct('types')
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

    const cursor = this.pokemonDb.aggregate<IPokemon>(query)
    const results = await cursor.toArray()
    return results
  }

  /**
   * gets an array of pokemon objects for array for pokemon ids
   *
   * @private
   * @param {string[]} favoritesIdArray array of pokemon ids
   * @return {*}  {Promise<IPokemon[]>}
   * @memberof PokemonContext
   */
  private async getFavoritesForPokemonIds(
    favoritesIdArray: string[]
  ): Promise<IPokemon[]> {
    // const cursor = this.pokemonDb.aggregate<IPokemon>([
    //   {
    //     $match: {
    //       id: {
    //         $in: favoritesIdArray, // array of pokemonIds
    //       },
    //     },
    //   },
    // ])
    // return await cursor.toArray()
    const cursor = this.pokemonDb.find<IPokemon>({
      id: {
        $in: favoritesIdArray, // array of pokemonIds
      },
    })
    return await cursor.toArray()
  }

  /**
   * Get pokemon records for a specific userId
   *
   * @param {string} uid userId
   * @return {*}  {Promise<IPokemon[]>}
   * @memberof PokemonContext
   */
  async getFavorites(uid: string): Promise<IPokemon[]> {
    // get the user profile list of favoriteId

    const favorites = await this.userDb.findOne<IPerson>(
      { uid: uid },
      // only return favorites
      { projection: { pokemon_favorites: 1, _id: 0 } }
    )

    // convert pokemon favorites object to array (see data model discussion at pokemon.type.d.ts)
    const pokemonIdArr = _.values(favorites.pokemon_favorites)
    const pokemon = await this.getFavoritesForPokemonIds(pokemonIdArr)
    return pokemon
  }

  /**
   * Mark pokemon as favorite for user
   *
   * @param {string} uid userId
   * @param {string} pokemonId
   * @param {boolean} isFavorite true = mark as favorite, false = remove as favorite
   * @return {*}  {Promise<void>}
   * @memberof PokemonContext
   */
  async updateFavorite(
    uid: string,
    pokemonId: string,
    isFavorite: boolean
  ): Promise<void> {
    if (isFavorite) {
      // create pokemon favorites update object
      // const favorite: IPersonPokemonFavorites = {
      //   pokemon_favorites: { [pokemonId]: pokemonId },
      // }

      // add to favorites
      await this.userDb.updateOne(
        { uid: uid },
        // { pokemonId: pokemonId } might seem odd, but this is a trick
        // for marking favorites at scale.
        // See discussion at "../models/profile.type", pokemon_favorites
        { $set: { [`pokemon_favorites.${pokemonId}`]: pokemonId } }
      )
    } else {
      // remove from favorites
      await this.userDb.updateOne(
        { uid: uid },
        { $unset: { [`pokemon_favorites.${pokemonId}`]: '' } }
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
