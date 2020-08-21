import { IWebEnvironment } from '../app/shared/models/environment'

export const environment: IWebEnvironment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyAPYs9wkbpzox-u2qUp9dm5PESKyDHImAs",
    authDomain: "pokemon-dcb38.firebaseapp.com",
    databaseURL: "https://pokemon-dcb38.firebaseio.com",
    projectId: "pokemon-dcb38",
    storageBucket: "pokemon-dcb38.appspot.com",
    messagingSenderId: "570026610651",
    appId: "1:570026610651:web:5202f70c8b56657d3e21fe",
    measurementId: "G-PDS8PR2W52"
  },
  // TODO: update deployed url
  apiUrl: 'http://localhost:8080', 
  timeout: 100,
}
