import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PrivateComponent } from './private.component'
import { AuthResolver } from '../shared/guards/auth.resolver'
import { AuthCanActivateGuard } from '../shared/guards/auth.guard'
import { SessionResolver } from '../shared/guards/session.resolver'
import { AuthComponent } from './auth/auth.component'

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    resolve: [AuthResolver, SessionResolver],
    canActivate: [AuthCanActivateGuard],
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'auth', component: AuthComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
