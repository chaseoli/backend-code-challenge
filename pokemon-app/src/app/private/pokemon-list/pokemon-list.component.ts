import { Component, OnInit, Input } from '@angular/core'
import { IPokemon } from '../../../../../api/src/models/pokemon.type'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  @Input() pokemon: IPokemon[]

  constructor() {}

  ngOnInit(): void {
    this.mock()
  }

  private mock() {
    this.pokemon = []
    const pokemonMock = {
      id: '001',
      name: 'Bulbasaur',
      classification: 'Seed Pokémon',
      types: ['Grass', 'Poison'],
      resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
      weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
      weight: { minimum: '6.04kg', maximum: '7.76kg' },
      height: { minimum: '0.61m', maximum: '0.79m' },
      fleeRate: 0.1,
      evolutionRequirements: { amount: 25, name: 'Bulbasaur candies' },
      evolutions: [
        { id: 2, name: 'Ivysaur' },
        { id: 3, name: 'Venusaur' },
      ],
      maxCP: 951,
      maxHP: 1071,
      attacks: {
        fast: [
          { name: 'Tackle', type: 'Normal', damage: 12 },
          { name: 'Vine Whip', type: 'Grass', damage: 7 },
        ],
        special: [
          { name: 'Power Whip', type: 'Grass', damage: 70 },
          { name: 'Seed Bomb', type: 'Grass', damage: 40 },
          { name: 'Sludge Bomb', type: 'Poison', damage: 55 },
        ],
      },
    }
    // add some pokemons 
    for (let i = 0; i < 4; i++) {
      this.pokemon.push(pokemonMock)
    }
  }
}
