import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { PokemonService } from 'src/app/shared/services/pokemon.service'
import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'
import { IPokemon } from '../../../../../api/src/models/pokemon.type'
import { LodashService } from 'src/app/shared/services/lodash.service '

@Component({
  selector: 'app-pokemon-query',
  templateUrl: './pokemon-query.component.html',
  styleUrls: ['./pokemon-query.component.scss'],
})
export class PokemonQueryComponent implements OnInit {
  types$: Observable<string[]>
  selectedTypesArr: string[]
  name: string
  favoritesId: string[]
  showFavorites: boolean
  favorites: IPokemon
  startAt: number
  take: number
  @Output() pokemon = new EventEmitter<IPokemon[]>()

  constructor(
    private pokemonService: PokemonService,
    private _: LodashService
  ) {}

  ngOnInit(): void {
    this.showFavorites = false
    this.startAt = 0
    this.take = 151
    this.getTypes()
    this.query()
  }

  async query() {
    if (!this.name) {
      this.name = null
    }
    let favsIdArr: string[] = null
    if (this.showFavorites) {
      const favs = await this.pokemonService.getFavorites().toPromise()
      if (favs.length > 0) {
        favsIdArr = this._._.map(favs, (i) => i.id)
      } else {
        alert("You don't have any favorites set.")
      }
    }
    const pokemon = await this.pokemonService
      .complex(this.startAt, this.take, this.name, this.selectedTypesArr, favsIdArr)
      .toPromise()
    this.pokemon.emit(pokemon)
  }

  onChangeTypes($event: any, type: string) {
    // console.log($event)
    // console.log(type)

    if ($event.checked) {
      // add the type
      this.selectedTypesArr.push(type)
    } else {
      // remove the type
      this.selectedTypesArr = this.selectedTypesArr.filter((e) => e !== type)
    }

    // console.log(this.selectedTypesArr)
  }

  getTypes() {
    this.types$ = this.pokemonService.getTypes()
    this.types$.pipe(first()).subscribe((res) => {
      console.log(res)
      this.selectedTypesArr = res
    })
  }

  onChangeName(partialName: string) {
    console.log(partialName)
    this.name = partialName
    // this.query()
  }

}
