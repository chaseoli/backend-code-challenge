import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import { IPerson } from '../../../../../api/src/models/profile.type'
import { LodashService } from 'src/app/shared/services/lodash.service '
import { UserService } from './user.service'

@Injectable()
export class SessionService {
  user: IPerson

  constructor(
    private db: UserService,
    public authService: AuthService,
    private _: LodashService
  ) {
    this.user = null
    this.getProfile()
  }

  async getProfile() {
    if (!this.user) {
      try {
        let person = await this.db
          .getByUid(this.authService.auth.auth.currentUser.uid)
          .toPromise()

        if (!person) {
          // if user does not exist then auth service was unsuccessful at
          // creating the user profile when the user registered.
          // retry here...
          person = {
            uid: this.authService.auth.auth.currentUser.uid,
            email: this.authService.auth.auth.currentUser.email,
          }

          await this.db.update(person).toPromise()
        }

        this.user = person
        return person
      } catch (error) {
        console.log(error)
      }
    }
  }
}
