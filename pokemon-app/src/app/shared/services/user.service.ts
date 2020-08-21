import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { IPerson } from '../../../../../api/src/models/profile.type'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  async registerUser(userCredential: firebase.auth.UserCredential) {
    // check if the user exists by uid
    const exists = this.getProfile(userCredential.user.uid)

    if (!exists) {
      // if user does not exist create their profile
      const person: IPerson = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        // profile: {
        //     first: '',
        //     last
        // }
      }

      return await this.http
        .post(`${environment.apiUrl}/user`, person)
        .toPromise()
    }
  }

  async getProfile(uid: string): Promise<IPerson> {
    return (await this.http
      .get(`${environment.apiUrl}/user/${uid}`)
      .toPromise()) as Promise<IPerson>
  }
}
