export interface IPokemon {
  id: string // "001",
  name: string // "Bulbasaur",
  classification: string // "Seed Pokémon",
  types: string[] // ["Grass", "Poison"],
  resistant: string[] // ["Water", "Electric", "Grass", "Fighting", "Fairy"],
  weaknesses: string[] // ["Fire", "Ice", "Flying", "Psychic"],
  weight: IMeasurements
  height: IMeasurements
  fleeRate: number // 0.1,
  'Previous evolution(s)': IEvolutions[]
  evolutionRequirements?: {
    amount: number // 25,
    name: string // "Bulbasaur candies"
  }
  evolutions?: IEvolutions[]
  maxCP: number // 951,
  maxHP: number // 1071,
  attacks: {
    fast: IAttack[]
    special: IAttack[]
  }
}

interface IAttack {
  name: string // "Tackle",
  type: string // "Normal",
  damage: number // 12
}

interface IMeasurements {
  minimum: string // "0.61m" for height, "6.04kg" for weight
  maximum: string // "0.79m" for height, "7.76kg" for weight
}

export interface IEvolutions {
  id: number // 2,
  name: string // "Ivysaur"
}

interface IPokemonTextSearch {
  match: IPokemon
  options: IPokemon[]
}
