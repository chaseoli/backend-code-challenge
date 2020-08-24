import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PrivateComponent } from './private.component'
import { AuthResolver } from '../shared/guards/auth.resolver'
import { AuthCanActivateGuard } from '../shared/guards/auth.guard'
import { SessionResolver } from '../shared/guards/session.resolver'
import { AuthComponent } from './auth/auth.component'
import { ByIdComponent } from './by-id/by-id.component'
import { ByNameComponent } from './by-name/by-name.component'

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    resolve: [AuthResolver, SessionResolver],
    canActivate: [AuthCanActivateGuard],
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'id/:id', component: ByIdComponent },
      { path: 'name/:name', component: ByNameComponent },
      { path: 'auth', component: AuthComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
