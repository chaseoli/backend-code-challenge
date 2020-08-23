// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IWebEnvironment } from '../app/shared/models/environment';

export const environment: IWebEnvironment = {
  production: false,
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
  apiUrl: 'http://localhost:8080',
  timeout: 100
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
