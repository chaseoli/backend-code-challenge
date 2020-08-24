import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  IPokemon,
  IPokemonTextSearch,
} from '../../../../../api/src/models/pokemon.type'
import { PokemonService } from 'src/app/shared/services/pokemon.service'
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-by-name',
  templateUrl: './by-name.component.html',
  styleUrls: ['./by-name.component.scss'],
})
export class ByNameComponent implements OnInit {
  pokemon: IPokemon[]
  msg: string
  private id: number

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.pokemon = []
  }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(async (params) => {
      const pokemon: IPokemonTextSearch = await this.pokemonService
        .getByName(params['name'])
        .toPromise()

      if (pokemon.match) {
        this.msg = "Found an exact match!"
        this.pokemon.push(pokemon.match)
      } else {
        this.msg = "No exact match, but here are some options..."
        this.pokemon = pokemon.options
      }
    })
  }
}
