import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { DocsComponent } from './docs/docs.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicComponent } from './public.component';
import { CustomCarbonModule } from '../shared/custom-carbon-angular.module';
import { InactiveComponent } from './inactive/inactive.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { RecoverComponent } from './auth/recover/recover.component';
import { NgTypedModule } from '../shared/modules/typed-module'
import { LodashService } from '../shared/services/lodash.service';

@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    DocsComponent,
    NotFoundComponent,
    InactiveComponent,
    RegisterComponent,
    LoginComponent,
    ResetComponent,
    RecoverComponent
  ],
  providers: [
    LodashService
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    CustomCarbonModule,
    FormsModule,
    ReactiveFormsModule,
    NgTypedModule
  ]
})
export class PublicModule { }
