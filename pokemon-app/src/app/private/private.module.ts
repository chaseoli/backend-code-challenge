import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PrivateRoutingModule } from './private-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PrivateComponent } from './private.component'
import { CustomCarbonModule } from '../shared/custom-carbon-angular.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgTypedModule } from '../shared/modules/typed-module'
import { SessionService } from '../shared/services/session.service'
import { SessionResolver } from '../shared/guards/session.resolver'
import { LodashService } from '../shared/services/lodash.service '
import { SwitcherComponent } from './switcher/switcher.component'
import { CustomLoadingComponent } from '../shared/components/loading.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthComponent } from './auth/auth.component'
import { AuthInterceptor } from '../shared/interceptor/auth.interceptor'
import { UserService } from '../shared/services/user.service'
import { PokemonService } from '../shared/services/pokemon.service'

@NgModule({
  declarations: [
    DashboardComponent,
    PrivateComponent,
    SwitcherComponent,
    CustomLoadingComponent,
    AuthComponent,
  ],
  entryComponents: [],
  providers: [
    SessionService,
    LodashService,
    SessionResolver,
    PokemonService
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomCarbonModule,
    NgTypedModule,
  ],
})
export class PrivateModule {}
