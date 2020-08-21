import { Route, Controller, OperationId, Post, Body } from 'tsoa'
import { IPokemon } from '../models/pokemon.model'
import { PokemonContext } from '../context/pokemon.context'
import { PokemonError } from '../err'

@Route('pokemon')
export class PokemonController extends Controller {
  private pokemon = new PokemonContext()
  @Post()
  @OperationId('pokemonSeed')
  public async seed(@Body() pokemons: IPokemon[]) {
    try {
      await this.pokemon.addMany(pokemons)
      return 'pokemon saved to database'
    } catch (error) {
      const e = new PokemonError('failed to save pokemon to database', error)
      this.setStatus(500)
      return e.message
    }
  }
}
