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
  'Previous evolution(s)'?: IEvolutions[]
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

export interface IPokemonComplexQuery {
  types?: string[]
  favorites?: string[]
}

export interface IPokemonFavorites {
  // The data structure "{ [pokemonId]: pokemonId }" might seem odd, but this is a trick
  // for marking favorites at scale. Because it does not keep track
  // useless data (like false for un-favorite pokemon). Also makes it:
  //  - 1. helps prevent simultaneous write (async write) issues that could
  //    possibly result in data collision issues, especially when mongo is 
  //    distributed in the HA cluster.
  //    eg: when simultaneous writes occur to an array because it is the same array field
  //    that is being updated in parallel, therefore it is possible that the writes
  //    will collide resulting in inconsistent data unless handled properly
  //  - 2. an object is easier to work with in JS because we can simply 
  //    grab the object and convert to an array (using lodash) to iterate over, 
  //    this is ok we do not expect a list of favorites for a specific user
  //    to have to scale
  //  - 3. we can "dot off of" the object to
  //    make queries faster and more efficient
  //  Alternative ways to structure data include:
  //  - 1. we could have used { pokemonId: true | false }
  //    but this unnecessarily tracks false for non-favorite pokemon.
  //    Which unnecessarily increases the size of our data and ultimately
  //    impacts performance.
  //  - 2. we could have tracked favorites in an array. However, we would have had to 
  //    implement a processing pipeline to handle writes synchronously to prevent 
  //    data collision issues as described above. Also, in
  //    general are inefficient to query. And more inefficient to update
  //    since the query will have to iterate through the array to update it.
  //    In general, flattening the data structure and maintain an object like
  //    structure will scale better in the long run.
  [pokemonId: string]: string // where both strings are the same pokemonId
}
