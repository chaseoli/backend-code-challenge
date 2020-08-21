import { Route, Controller, OperationId, Post, Body, Get, Query } from 'tsoa'
import { IPokemon, IPokemonTextSearch } from '../models/pokemon.model'
import { PokemonContext } from '../context/pokemon.context'
import { PokemonError } from '../err'
import { IGenericHttpResponse, IGenericErrorResponse } from '../models/generic.model'

@Route('pokemon')
export class PokemonController extends Controller {
  private pokemon = new PokemonContext()
  @Post()
  @OperationId('pokemonAdd')
  public async add(@Body() pokemons: IPokemon[]): Promise<IGenericHttpResponse | IGenericErrorResponse> {
    try {
      await this.pokemon.addMany(pokemons)
      return {
        message: 'pokemon saved to database',
      }
    } catch (error) {
      const e = new PokemonError('failed to save pokemon to database', error)
      this.setStatus(500)
      return {
        errorMessage: e.message,
        errorId: e.id
      }
    }
  }

  @Get('id/{id}')
  @OperationId('pokemonById')
  public async byId(id: string) {
    try {
      const p = await this.pokemon.getById(id)
      return p
    } catch (error) {
      //  TODO:...
    }
  }

  @Get('name/{name}')
  @OperationId('pokemonByName')
  public async byName(name: string): Promise<IPokemonTextSearch | > {
    try {
      const p = await this.pokemon.getByName(name)
      return p
    } catch (error) {
      //  TODO:...
    }
  }

  @Get('types')
  @OperationId('pokemonAllTypes')
  public async getAllTypes() {
    try {
      await this.pokemon.getAllTypes()
      return 'pokemon saved to database'
    } catch (error) {
      //  TODO:...
    }
  }

  @Get()
  @OperationId('pokemonQuery')
  public async query(
    @Query() name: string,
    @Query() type: string,
    @Query() favorite: boolean,
    @Query() start: string,
    @Query() end: string
  ) {
    try {
      // TODO: ...
    } catch (error) {
      // TODO: ...
    }
  }
}
