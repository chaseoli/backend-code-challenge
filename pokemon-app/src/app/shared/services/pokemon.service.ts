import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  IPokemon,
  IPokemonComplexQuery,
} from '../../../../../api/src/models/pokemon.type'
import { environment } from '../../../environments/environment'
import { LodashService } from './lodash.service '

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient, private _: LodashService) {}

  getFavorites() {}

  addFavorite() {}

  complex(
    startAtIdx: number,
    take: number,
    types?: string[],
    favorites?: string[],
    name?: string
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
    return this.http.post<IPokemon[]>(
      `${environment.apiUrl}/complex/${startAtIdx}/${take}`,
      body,
      {
        params: {
          name: name,
        },
      }
    )
  }
}
