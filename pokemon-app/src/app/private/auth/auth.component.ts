import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  tempAuthToken: string

  constructor(
    public authService: AuthService
  ) { }

  async ngOnInit() {
   
    const h = await this.authService.getFirebaseAuthHeaders()
    this.tempAuthToken = h.get('x-Auth')
    
  }

}
