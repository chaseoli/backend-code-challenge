import { Component, OnInit } from '@angular/core'
import { IPokemon } from '../../../../../api/src/models/pokemon.type'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pokemon: IPokemon[]

  constructor() {}

  ngOnInit() {}

  onChange(pokemon: IPokemon[]) {
    this.pokemon = pokemon
  }
}
