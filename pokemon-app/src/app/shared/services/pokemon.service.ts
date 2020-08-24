import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  IPokemon,
  IPokemonComplexQuery,
  IPokemonTextSearch,
} from '../../../../../api/src/models/pokemon.type'
import { environment } from '../../../environments/environment'
import { LodashService } from './lodash.service '

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient, private _: LodashService) {}

  getById(id: string) {
    return this.http.get<IPokemon>(`${environment.apiUrl}/pokemon/id/${id}`)
  }

  getByName(name: string) {
    return this.http.get<IPokemonTextSearch>(`${environment.apiUrl}/pokemon/name/${name}`)
  }

  getFavorites() {
    return this.http.get<IPokemon[]>(`${environment.apiUrl}/pokemon/favorites`)
  }

  addFavorite(pokemonId: string, isFavorite: 0 | 1) {
    return this.http.post(
      `${environment.apiUrl}/pokemon/favorites/${pokemonId}/${isFavorite}`,
      {}
    )
  }

  getTypes() {
    return this.http.get<string[]>(`${environment.apiUrl}/pokemon/types`)
  }

  complex(
    startAtIdx: number,
    take: number,
    name?: string,
    types?: string[],
    favorites?: string[]
  ) {
    const body: IPokemonComplexQuery = {
      //   types: [],
      //   favorites: [],
    }
    if (types) {
      this._._.set(body, 'types', types)
    }
    if (favorites) {
      this._._.set(body, 'favorites', favorites)
    }
    let options = {}
    if (name) {
      options = {
        params: {
          name: name,
        },
      }
    }
    return this.http.post<IPokemon[]>(
      `${environment.apiUrl}/pokemon/complex/${startAtIdx}/${take}`,
      body,
      options
    )
  }
}
