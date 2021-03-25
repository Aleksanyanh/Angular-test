import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from '@app/auth/auth.component';
import { LoginComponent } from '@app/auth/pages/login/login.component';
import { LOGIN } from '@app/core/constants/path';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: LOGIN, component: LoginComponent },
      { path: '', redirectTo: LOGIN, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
