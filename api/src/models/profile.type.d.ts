import { IEvolutions } from './pokemon.type'

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

export interface IPerson {
  uid: string
  email: string
  profile?: IPersonProfile
  // The data structure "{ [pokemonId]: pokemonId }" might seem odd, but this is a trick
  // for marking favorites at scale. Because it does not keep track
  // useless data (like false for un-favorite pokemon). Also makes it
  // easier to work with in JS because we can simple grab the object and
  //  - convert to an array (using lodash) to iterate over, this is ok
  //    we do not expect a list of favorites for a specific user 
  //    to have to scale
  //  - snd most importantly we can "dot off of" the object to 
  //    make queries faster and more efficient
  //  Alternative way to structure this include: ,
  //   1. we could have used { pokemonId: true | false }
  //    but this unnecessarily tracks false for non-favorite pokemon.
  //    Which unnecessarily increases the size of our data and ultimately
  //    impacts performance.
  //   2. we could have tracked favorites in an array. However, arrays in
  //    general are inefficient to query. And more inefficient to update
  //    since the query will have to iterate through the array to update it.
  //    In general, flattening the data structure and maintain an object like
  //    structure will scale better in the long run.
  pokemon_favorites?: { [pokemonId: string]: string }
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
