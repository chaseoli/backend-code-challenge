import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import { AuthService } from './auth.service'
import { IPerson } from '../../../../../api/src/models/profile.type'
import * as firebase from 'firebase/app'
import 'firebase/database'
import { LodashService } from 'src/app/shared/services/lodash.service '

@Injectable()
export class SessionService {
  user: IPerson
  init: boolean

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private _: LodashService
  ) {
    this.user = null
    this.init = false
    this.getProfile()
  }

  async getProfile() {
    return await this.db.database
      .ref(`users/${(await this.authService.auth.auth.currentUser).uid}`)
      .once('value', (dataSnapshot: firebase.database.DataSnapshot) => {
        this.setVals(dataSnapshot)
      })
  }

  // // use the following if using a realtime stream you can plugin to:
  //   private async watchProfile() {
  //     return this.db.database
  //       .ref(`users/${(await this.authService.auth.auth.currentUser).uid}`)
  //       .on('value', (dataSnapshot: firebase.database.DataSnapshot) => {
  //         this.setVals(dataSnapshot)
  //       })
  //   }

  private setVals(dataSnapshot: firebase.database.DataSnapshot) {
    const user: IPerson = dataSnapshot.val()
    // IMPORTANT: when user registers for the first time
    // the account and profile might not be created yet.
    // The firebase trigger must fire to create the profile
    // and account + keys
    if (user) {
      this.user = user
    }
  }
}
