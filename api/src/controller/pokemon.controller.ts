import {
  Route,
  Controller,
  OperationId,
  Post,
  Body,
  Get,
  Query,
  Security,
  Request,
} from 'tsoa'
import {
  IPokemon,
  IPokemonTextSearch,
  IPokemonComplexQuery,
} from '../models/pokemon.type'
import { PokemonContext } from '../context/pokemon.context'
import { PokemonError } from '../err'
import {
  IGenericHttpResponse,
  IGenericErrorResponse,
} from '../models/generic.type'
import { IRequestUser } from '../models/user.type'

@Route('pokemon')
export class PokemonController extends Controller {
  private pokemon = new PokemonContext()
  /**
   * Batch add pokemon to the database
   *
   * @param {IPokemon[]} pokemons
   * @return {*}  {(Promise<IGenericHttpResponse | IGenericErrorResponse>)}
   * @memberof PokemonController
   */
  @Post()
  @OperationId('pokemonAdd')
  @Security({
    user: [],
  })
  public async add(
    @Body() pokemons: IPokemon[]
  ): Promise<IGenericHttpResponse | IGenericErrorResponse> {
    try {
      await this.pokemon.addMany(pokemons)
      return {
        message: 'pokemon saved to database',
      }
    } catch (error) {
      const e = new PokemonError('failed to save pokemon to database', error)
      this.setStatus(400)
      return {
        errorMessage: e.message,
        errorId: e.id,
      }
    }
  }

  /**
   * Get Pokemon by specified pokemon id
   *
   * @param {string} id
   * @return {*}  {(Promise<IPokemon | IGenericErrorResponse>)}
   * @memberof PokemonController
   */
  @Get('id/{id}')
  @OperationId('pokemonById')
  public async byId(id: string): Promise<IPokemon | IGenericErrorResponse> {
    try {
      const p = await this.pokemon.getById(id)
      return p
    } catch (error) {
      const e = new PokemonError(
        'failed to query pokemon by id from database',
        error
      )
      this.setStatus(400)
      return {
        errorMessage: e.message,
        errorId: e.id,
      }
    }
  }

  /**
   * Get pokemon by name. Returns exact match if possible, otherwise it provides similarly named pokemon
   *
   * @param {string} name
   * @return {*}  {(Promise<IPokemonTextSearch | IGenericErrorResponse>)}
   * @memberof PokemonController
   */
  @Get('name/{name}')
  @OperationId('pokemonByName')
  public async byName(
    name: string
  ): Promise<IPokemonTextSearch | IGenericErrorResponse> {
    try {
      const p = await this.pokemon.getByName(name)
      return p
    } catch (error) {
      const e = new PokemonError(
        'failed to query pokemon by name from database',
        error
      )
      this.setStatus(400)
      return {
        errorMessage: e.message,
        errorId: e.id,
      }
    }
  }

  /**
   * Gets all pokemon types listed in the database
   *
   * @return {*}  {(Promise<string[] | IGenericErrorResponse>)}
   * @memberof PokemonController
   */
  @Get('types')
  @OperationId('pokemonAllTypes')
  public async getAllTypes(): Promise<string[] | IGenericErrorResponse> {
    try {
      const types = await this.pokemon.getAllTypes()
      return types
    } catch (error) {
      const e = new PokemonError(
        'failed to query pokemon types from database',
        error
      )
      this.setStatus(400)
      return {
        errorMessage: e.message,
        errorId: e.id,
      }
    }
  }

  /**
   * Implements a complex query that allows filtering of pokemon by favorite, type, name, and enables paging. 
   *
   * @param {number} startAtIdx
   * @param {number} take
   * @param {IPokemonComplexQuery} body
   * @param {string} [name]
   * @return {*}  {(Promise<IPokemon[] | IGenericErrorResponse>)}
   * @memberof PokemonController
   */
  @Post('complex/{startAtIdx}/{take}')
  @OperationId('pokemonQuery')
  public async complex(
    startAtIdx: number,
    take: number,
    @Body() body: IPokemonComplexQuery,
    @Query() name?: string
  ): Promise<IPokemon[] | IGenericErrorResponse> {
    try {
      return await this.pokemon.filterAll(
        startAtIdx + take,
        startAtIdx,
        name,
        body.types,
        body.favorites
      )
    } catch (error) {
      const e = new PokemonError(
        'failed to perform complex query on pokemon from database',
        error
      )
      this.setStatus(400)
      return {
        errorMessage: e.message,
        errorId: e.id,
      }
    }
  }

  /**
   * Gets favorite (eg: liked) pokemon for a user
   *
   * @param {IRequestUser} request
   * @return {*}  {(Promise<IPokemon[] | IGenericErrorResponse>)}
   * @memberof PokemonController
   */
  @Get('favorites')
  @OperationId('pokemonGetFavorites')
  @Security({
    user: [],
  })
  public async getFavorites(
    @Request() request: IRequestUser
  ): Promise<IPokemon[] | IGenericErrorResponse> {
    try {
      const p = await this.pokemon.getFavorites(request.user.uid)
      return p
    } catch (error) {
      const e = new PokemonError('failed to get favorites from database', error)
      this.setStatus(400)
      return {
        errorMessage: e.message,
        errorId: e.id,
      }
    }
  }

  /**
   * Marks (and un-marks) pokemon as favorites
   *
   * @param {IRequestUser} request
   * @param {string} pokemonId
   * @param {(0 | 1)} isFavorite  1 = mark as favorite, 0 = remove as favorite
   * @return {*}  {(Promise<void | IGenericErrorResponse>)}
   * @memberof PokemonController
   */
  @Post('favorites/{pokemonId}/{isFavorite}')
  @OperationId('pokemonNewFavorite')
  @Security({
    user: [],
  })
  public async favorite(
    @Request() request: IRequestUser,
    pokemonId: string,
    isFavorite: 0 | 1
  ): Promise<void | IGenericErrorResponse> {
    try {
      let _isFavorite = false // default to not a favorite
      // check if is a user's favorite
      if (isFavorite === 1) {
        _isFavorite = true
      }
      // update favorite preference
      await this.pokemon.updateFavorite(
        request.user.uid,
        pokemonId,
        _isFavorite
      )
      return
    } catch (error) {
      const e = new PokemonError(
        'failed to perform complex query on pokemon from database',
        error
      )
      this.setStatus(400)
      return {
        errorMessage: e.message,
        errorId: e.id,
      }
    }
  }
}
