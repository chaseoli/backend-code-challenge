import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IPokemon } from '../../../../../api/src/models/pokemon.type'
import { first } from 'rxjs/operators'
import { PokemonService } from 'src/app/shared/services/pokemon.service'

@Component({
  selector: 'app-by-id',
  templateUrl: './by-id.component.html',
  styleUrls: ['./by-id.component.scss'],
})
export class ByIdComponent implements OnInit {
  pokemon: IPokemon[]
  private id: number

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.pokemon = []
  }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(async (params) => {
      const pokemon = await this.pokemonService
        .getById(params['id'])
        .toPromise()
      this.pokemon.push(pokemon)
    })
  }
}
