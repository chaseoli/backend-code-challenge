import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CustomCarbonModule } from './shared/custom-carbon-angular.module'
import { environment } from '../environments/environment'
import { AuthModule } from './shared/modules/auth.module'
import { WindowService } from './shared/services/window.service'
import { DocumentService } from './shared/services/document.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './shared/interceptor/auth.interceptor'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    CustomCarbonModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [
    DocumentService,
    WindowService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
