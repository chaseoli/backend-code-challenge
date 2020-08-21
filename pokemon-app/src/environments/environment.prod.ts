import { IWebEnvironment } from '../app/shared/models/environment'

export const environment: IWebEnvironment = {
  production: true,
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },
  // TODO: update deployed url
  apiUrl: 'http://localhost:8080', 
  timeout: 100,
}
