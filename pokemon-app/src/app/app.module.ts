import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomCarbonModule } from './shared/custom-carbon-angular.module';
import { environment } from '../environments/environment';
import { AuthModule } from './shared/modules/auth.module';
import { WindowService } from './shared/services/window.service';
import { DocumentService } from './shared/services/document.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    CustomCarbonModule,
    AuthModule
  ],
  providers: [
    DocumentService,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
