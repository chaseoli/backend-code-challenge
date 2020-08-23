import { Route, Controller, OperationId, Post, Body, Get, Query } from 'tsoa'
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

@Route('pokemon')
export class PokemonController extends Controller {
  private pokemon = new PokemonContext()
  @Post()
  @OperationId('pokemonAdd')
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

  @Get('complex/{startAtIdx}/{take}')
  @OperationId('pokemonQuery')
  public async complex(
    startAtIdx: number,
    take: number,
    @Body() body: IPokemonComplexQuery,
    @Query() name?: string
  ) :Promise<IPokemon[] | IGenericErrorResponse> {
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

  @Post('favorite/{pokemonId}/{isFavorite}')
  @OperationId('pokemonQuery')
  public async favorite(
    pokemonId: string,
    isFavorite: 0 | 1,
  ): Promise<void | IGenericErrorResponse> {
    try {
      await 
     return
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


}
