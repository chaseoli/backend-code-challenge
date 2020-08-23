import { IPokemonFavorites } from './pokemon.type'

export interface IRequestUser {
  user: { uid: string; email: string }
}

export interface IRoot {
  // used to query details by username
  // maintained and updated by a firebase function
  usernameMap: {
    [username: string]: string // uid
  }

  users: {
    [uid: string]: IPerson
  }
}

interface ILocality {
  // Country of Residence
  // 2 character country code
  // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
  country: string

  // Postal Address (full legal mailing address)
  // address formats are inconsistent throughout the world
  // so this input could be validated through google maps
  // or through a custom input component that forces international
  // formats based on a pre-designed ui form for the relevant region
  // ISO 2022 attempts to use 3.1.6 of https://www.iso20022.org/sites/default/files/documents/general/ISO20022_BAHV2_MDR_v1.pdf
  mailingAddress?: string

  // geo position (latitude, longitude)
  // use google maps to set lat lon based on mailing address
  lat?: string
  lon?: string
}

export interface IPerson extends IPersonPokemonFavorites {
  uid: string
  email: string
  profile?: IPersonProfile
}

export interface IPersonPokemonFavorites {
  pokemon_favorites?: IPokemonFavorites
}

interface IPersonProfile extends ILocality {
  // name
  first: string
  nickname?: string
  middle?: string
  last: string

  // primary phone
  phone: string

  // cell phone
  mobile?: string

  email: string
}
